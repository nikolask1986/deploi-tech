import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user with a hashed password
   *
   * Process:
   * 1. Checks for username uniqueness
   * 2. Hashes the password
   * 3. Creates and saves the user
   * 4. Returns user data without password
   *
   * @param createUserDto - User creation data (username, password, optional role and tier)
   * @returns Promise with user data (excluding password)
   * @throws ConflictException if username already exists
   */
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  /**
   * Finds a user by their username
   *
   * Used primarily for:
   * - Authentication
   * - Username uniqueness validation
   *
   * @param username - The username to search for
   * @returns Promise<User | null> The found user or null
   */
  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  /**
   * Retrieves all users in the system
   *
   * Note: This should typically be restricted to admin access
   *
   * @returns Promise<User[]> Array of all users
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * Finds a user by their ID
   *
   * @param id - The user ID to search for
   * @returns Promise<User> The found user
   * @throws NotFoundException if user doesn't exist
   */
  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Updates a user's information
   *
   * Process:
   * 1. Verifies user exists
   * 2. If username is being changed, checks for uniqueness
   * 3. If password is being changed, hashes the new password
   * 4. Updates and saves the user
   * 5. Returns updated user data without password
   *
   * @param id - The ID of the user to update
   * @param updateUserDto - The new user data
   * @returns Promise with updated user data (excluding password)
   * @throws NotFoundException if user doesn't exist
   * @throws ConflictException if new username already exists
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.findByUsername(updateUserDto.username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });

    const { password, ...result } = updatedUser;
    return result;
  }
}
