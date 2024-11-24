import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials against the database
   *
   * Process:
   * 1. Finds user by username
   * 2. Compares provided password with stored hash
   * 3. Returns user data without password if valid
   *
   * @param username - The username to validate
   * @param password - The password to validate
   * @returns The user object without password if valid, null otherwise
   */
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Authenticates a user and generates a JWT token
   *
   * Process:
   * 1. Validates user credentials
   * 2. If valid, generates a JWT token containing:
   *    - username
   *    - user ID (as 'sub')
   *    - user role
   * 3. Returns token and user data
   *
   * @param username - The username to authenticate
   * @param password - The password to authenticate
   * @returns Object containing access token and user data
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
