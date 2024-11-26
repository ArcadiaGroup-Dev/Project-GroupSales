import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Nombre de la categoria' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Devices and gadgets', description: 'Descripcion de la categoria', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}