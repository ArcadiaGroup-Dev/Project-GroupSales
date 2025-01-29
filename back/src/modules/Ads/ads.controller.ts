import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ads.dto';
import { UpdateAdDto } from './dto/update-ads.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Ad } from './entities/ads.entity';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiOperation({ summary: 'Crear una nueva publicidad' })
  @ApiResponse({ status: 201, description: 'Publicidad creada exitosamente', type: Ad })
  @Post()
  async create(@Body() createAdDto: CreateAdDto) {
    return await this.adsService.create(createAdDto);
  }

  @ApiOperation({ summary: 'Obtener todas las publicidades' })
  @ApiResponse({ status: 200, description: 'Lista de publicidades', type: [Ad] })
  @Get()
  async findAll() {
    return await this.adsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una publicidad por ID' })
  @ApiResponse({ status: 200, description: 'Publicidad encontrada', type: Ad })
  @ApiResponse({ status: 404, description: 'Publicidad no encontrada' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar una publicidad por ID' })
  @ApiResponse({ status: 200, description: 'Publicidad actualizada', type: Ad })
  @ApiResponse({ status: 404, description: 'Publicidad no encontrada' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return await this.adsService.update(id, updateAdDto);
  }

  @ApiOperation({ summary: 'Eliminar una publicidad por ID' })
  @ApiResponse({ status: 200, description: 'Publicidad eliminada' })
  @ApiResponse({ status: 404, description: 'Publicidad no encontrada' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adsService.remove(id);
  }
}
