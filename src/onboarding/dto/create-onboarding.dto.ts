import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOnboardingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsEmail()
  email: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  initialAmount: number;
}
