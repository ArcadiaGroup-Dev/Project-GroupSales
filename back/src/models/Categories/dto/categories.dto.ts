import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Devices and gadgets', description: 'Description of the category', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}