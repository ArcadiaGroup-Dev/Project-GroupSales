import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('create-preference')
  async createPreference(@Body() body: any) {
    // Log para depuración
    console.log('Recibiendo datos para la preferencia:', body);

    // Creamos la preferencia según los datos recibidos
    const preference = {
      items: body.items.map((product) => ({
        title: product.title, // Título del producto
        unit_price: parseFloat(product.unit_price), // Precio como número
        quantity: product.quantity, // Cantidad de productos
      })),
      back_urls: {
        success: 'https://yourdomain.com/success', // URL en caso de éxito
        failure: 'https://yourdomain.com/failure', // URL en caso de fracaso
        pending: 'https://yourdomain.com/pending', // URL en caso de pendiente
      },
      auto_return: 'approved', // Redirigir automáticamente al usuario tras la aprobación
    };

    try {
      // Llamada al servicio para crear la preferencia en MercadoPago
      const response =
        await this.mercadoPagoService.createPreference(preference);
      return response; // Retorna la respuesta de MercadoPago
    } catch (error) {
      console.error('Error al crear preferencia:', error);
      throw new Error('Error al crear la preferencia');
    }
  }
}
