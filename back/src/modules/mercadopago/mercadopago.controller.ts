import { Controller, Post, Body, Query, Res } from '@nestjs/common';
import { Response } from 'express'; // Importa la clase Response de Express
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

  @Post('webhook')
  async handleWebhook(
    @Body() body: any,
    @Query('expectedId') expectedId: string,
    @Res() res: Response, // Asegúrate de que `res` esté correctamente tipado
  ) {
    // Verifica que el tipo de la notificación sea 'payment'
    if (body.type === 'payment') {
      const paymentId = body.data.id;

      // Compara el ID del pago recibido con el esperado
      if (paymentId === expectedId) {
        try {
          // Llama al servicio para validar el pago
          const paymentResult =
            await this.mercadoPagoService.validatePayment(paymentId);

          // Responde con el resultado del pago si es válido
          return res.status(200).json({
            message: 'ID coincidente, pago procesado',
            paymentResult,
          });
        } catch (error) {
          // Si ocurre un error al procesar el pago, responde con error
          return res.status(500).json({
            message: 'Error al procesar el pago',
            error: error.message,
          });
        }
      } else {
        // Si los IDs no coinciden, responde con un error
        return res.status(400).json({ message: 'ID no coincidente' });
      }
    } else {
      // Si el tipo no es 'payment', simplemente responde que la notificación fue recibida
      return res.status(200).json({ message: 'Webhook recibido' });
    }
  }
}
