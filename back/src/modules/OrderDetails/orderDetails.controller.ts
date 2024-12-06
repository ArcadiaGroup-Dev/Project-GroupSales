import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrderDetailService } from './orderDetails.service';
import { CreateOrderDetailDto } from './dto/order-detail.dto';

@Controller('order-details')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return await this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  async findAll() {
    return await this.orderDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderDetailService.findOne(id);
  }
}
