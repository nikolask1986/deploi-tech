import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { Tier } from '../../common/enums/tier.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEnum(Tier)
  @IsOptional()
  tier?: Tier;
}
