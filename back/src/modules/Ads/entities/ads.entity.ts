import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum AdType {
  A = 'A',
  B = 'B',
}

@Entity('ads')
export class Ad {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID único de la publicidad' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Oferta especial', description: 'Nombre de la publicidad' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de la imagen de la publicidad' })
  @Column({ type: 'text' })
  img: string;

  @ApiProperty({ example: 'A', description: 'Tipo de publicidad (A o B)', enum: AdType })
  @Column({ type: 'enum', enum: AdType })
  type: AdType;
}
