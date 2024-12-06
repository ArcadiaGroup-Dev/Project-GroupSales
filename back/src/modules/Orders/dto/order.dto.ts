import { ApiProperty, PickType } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: [{ id: '', quantity: 1 }],
    description: 'Array de productos con id y cantidad',
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Array<{ id: string, quantity: number }>;
}



