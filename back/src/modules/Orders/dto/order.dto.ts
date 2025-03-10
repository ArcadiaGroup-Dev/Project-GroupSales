import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: [{ id: '', quantity: 1, seller: '' }],
    description: 'Array de productos con id, cantidad y vendedor (seller)',
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Array<{
    id: string;
    quantity: number;
    seller: string; // Añadido seller aquí
  }>;
}
