import { Injectable } from '@nestjs/common';
import { AdsRepository } from './ads.repository';
import { CreateAdDto } from './dto/create-ads.dto';
import { UpdateAdDto } from './dto/update-ads.dto';

@Injectable()
export class AdsService {
  constructor(private readonly adsRepository: AdsRepository) {}

  async create(createAdDto: CreateAdDto) {
    return await this.adsRepository.createAd(createAdDto);
  }

  async findAll() {
    return await this.adsRepository.getAllAds();
  }

  async findOne(id: string) {
    return await this.adsRepository.getAdById(id);
  }

  async update(id: string, updateAdDto: UpdateAdDto) {
    return await this.adsRepository.updateAd(id, updateAdDto);
  }

  async remove(id: string) {
    return await this.adsRepository.deleteAd(id);
  }
}
