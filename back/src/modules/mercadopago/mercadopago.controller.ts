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
        success: 'http://localhost:3001/compra-exitosa', // URL de éxito en desarrollo
        failure: 'http://localhost:3001/error-pago', // URL de fallo en desarrollo
        pending: 'http://localhost:3001/pendiente-pago', // URL de pendiente en desarrollo
      },
      auto_return: 'approved', 
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
