import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AdType } from '../entities/ads.entity';

export class CreateAdDto {
  @ApiProperty({ example: 'Promo 2x1', description: 'Nombre de la publicidad' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'https://example.com/ad.jpg',
    description: 'URL de la imagen',
  })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({
    example: 'B',
    description: 'Tipo de publicidad (A o B)',
    enum: AdType,
  })
  @IsEnum(AdType)
  type: AdType;
}
