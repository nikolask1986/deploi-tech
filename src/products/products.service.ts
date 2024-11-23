import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
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
    if (!user.tier) {
      throw new Error('User tier is undefined');
    }

    return this.productsRepository.save({
      ...createProductDto,
      minimumTier: user.tier,
      user,
    });
  }

  /**
   * Retrieves products based on user's role and tier level
   *
   * Authorization rules:
   * 1. Admins can see all products in the system
   * 2. Regular users can see:
   *    - All products they created (regardless of tier)
   *    - Any products with a minimumTier less than or equal to their current tier
   *
   * Example tier access:
   * - FREE tier: sees only FREE tier products
   * - BASIC tier: sees FREE and BASIC tier products
   * - PREMIUM tier: sees FREE, BASIC, and PREMIUM tier products
   * - ENTERPRISE tier: sees all tier products
   * - ADMIN role: sees all products regardless of tier
   *
   * @param user - The authenticated user requesting products
   * @returns Promise<Product[]> Array of accessible products
   */
  async findAll(user: User) {
    if (user.role === Role.ADMIN) {
      return this.productsRepository.find({
        relations: ['user'],
      });
    }

    return this.productsRepository.find({
      where: [
        { user: { id: user.id } },
        { minimumTier: LessThanOrEqual(user.tier) },
      ],
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
