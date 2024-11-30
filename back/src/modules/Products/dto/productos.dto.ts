import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsInt,
  IsUUID,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Smartphone X',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example:
      'Un smartphone de última generación con pantalla OLED de 6.5 pulgadas.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Precio del producto en formato decimal',
    example: 799.99,
  })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en stock (opcional)',
    example: 50,
    required: false,
  })
  @IsInt()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    description: 'URL de la imagen del producto (opcional)',
    example: 'https://example.com/images/smartphone-x.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateProductDto extends PickType(CreateProductDto, [
  'name',
  'description',
  'price',
  'stock',
  'imageUrl',
  'categoryId',
] as const) {}
