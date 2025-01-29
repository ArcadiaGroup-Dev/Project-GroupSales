import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { AdsRepository } from './ads.repository';
import { Ad } from './entities/ads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ad])],
  controllers: [AdsController],
  providers: [AdsService, AdsRepository],
  exports: [AdsService],
})
export class AdsModule {}
