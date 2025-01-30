import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './entities/ads.entity';

@Injectable()
export class AdsRepository {
  constructor(
    @InjectRepository(Ad)
    private readonly adsRepository: Repository<Ad>,
  ) {}

  async createAd(createAdDto: Partial<Ad>) {
    const ad = this.adsRepository.create(createAdDto);
    return await this.adsRepository.save(ad);
  }

  async getAllAds() {
    return await this.adsRepository.find();
  }

  async getAdById(id: string) {
    const ad = await this.adsRepository.findOneBy({ id });
    if (!ad)
      throw new NotFoundException(`Publicidad con id ${id} no encontrada`);
    return ad;
  }

  async updateAd(id: string, updateAdDto: Partial<Ad>) {
    const ad = await this.getAdById(id);
    Object.assign(ad, updateAdDto);
    return await this.adsRepository.save(ad);
  }

  async deleteAd(id: string) {
    const ad = await this.getAdById(id);
    return await this.adsRepository.remove(ad);
  }
}
