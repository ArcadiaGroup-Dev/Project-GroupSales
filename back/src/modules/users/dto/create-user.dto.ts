import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'Banco (opcional)',
    example: 'BBVA',
    required: false,
  })
  @IsOptional()
  @IsString()
  bank?: string;

  @ApiProperty({
    description: 'Cuenta bancaria (opcional)',
    example: '123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  account?: string;

  @ApiProperty({
    description: 'Titular de la cuenta (opcional)',
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  cardHolder?: string;

  @ApiProperty({
    description: 'Titular de la cuenta (opcional)',
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiProperty({
    description: 'Titular de la cuenta (opcional)',
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString()
  cbu?: string;
}
