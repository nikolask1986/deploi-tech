import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Tier } from '../../common/enums/tier.enum';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsEnum(Tier)
  @IsOptional()
  minimumTier?: Tier = Tier.FREE;
}
