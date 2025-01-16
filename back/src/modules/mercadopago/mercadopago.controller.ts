/* import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create-preference')
  async createPreference(@Body() body: any) {
    const preference = {
      items: [
        {
          title: body.title,
          unit_price: body.price,
          quantity: body.quantity,
        },
      ],
      back_urls: {
        success: 'https://yourdomain.com/success',
        failure: 'https://yourdomain.com/failure',
        pending: 'https://yourdomain.com/pending',
      },
      auto_return: 'approved',
    };

    return this.mercadoPagoService.createPreference(preference);
  }
}
 */
