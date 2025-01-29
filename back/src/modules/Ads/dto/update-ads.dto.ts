import { PartialType } from '@nestjs/mapped-types';
import { CreateAdDto } from './create-ads.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AdType } from '../entities/ads.entity';

export class UpdateAdDto extends PartialType(CreateAdDto) {
  @ApiProperty({ example: 'Nueva promo', description: 'Nuevo nombre de la publicidad', required: false })
  name?: string;

  @ApiProperty({ example: 'https://example.com/new-image.jpg', description: 'Nueva URL de la imagen', required: false })
  img?: string;

  @ApiProperty({ example: 'A', description: 'Nuevo tipo de publicidad', required: false, enum: AdType })
  @IsEnum(AdType)
  type?: AdType;
}
