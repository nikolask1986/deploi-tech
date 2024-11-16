import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, user: User) {
    const product = this.productsRepository.create({
      ...createProductDto,
      user,
    });
    return this.productsRepository.save(product);
  }

  async findAll(user: User) {
    if (user.role === Role.ADMIN) {
      return this.productsRepository.find({
        relations: ['user'],
      });
    }

    return this.productsRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  }

  async findOne(id: number, user: User) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (user.role !== Role.ADMIN && product.user.id !== user.id) {
      throw new ForbiddenException('You can only access your own products');
    }

    return product;
  }
}
