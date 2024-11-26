import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/categories.dto';
import { UpdateCategoryDto } from './dto/categories.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categorías')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Crea una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente.' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías.' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene una categoría específica por ID' })
  @ApiResponse({ status: 200, description: 'Categoría obtenida exitosamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualiza una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Elimina una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}

