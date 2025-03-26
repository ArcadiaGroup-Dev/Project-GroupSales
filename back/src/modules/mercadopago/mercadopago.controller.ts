import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express'; // Importa la clase Response de Express
import { MercadoPagoService } from './mercadopago.service';

const webhookUrl = process.env.MERCADO_PAGO_WEBHOOK_URL || 'http://localhost:3000/mercadopago/webhook';


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
        success: 'https://project-groupsales-front.onrender.com/compra-exitosa', // URL de éxito en desarrollo
        failure: 'https://project-groupsales-front.onrender.com/error-pago', // URL de fallo en desarrollo
        pending: 'https://project-groupsales-front.onrender.com/pendiente-pago', // URL de pendiente en desarrollo
      },
      auto_return: 'approved',
      notification_url: webhookUrl,
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
  async handleWebhook(@Body() body: any, @Res() res: Response) {
    console.log('Webhook recibido:', body);

    if (body.type === 'payment' && body.data.id) {
      const paymentId = body.data.id;
      try {
        // Llama al servicio para validar el pago
        const paymentResult =
          await this.mercadoPagoService.validatePayment(paymentId);

        console.log('Pago validado:', paymentResult);

        return res.status(200).json({
          message: 'Pago procesado correctamente',
          paymentResult,
        });
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        return res
          .status(500)
          .json({ message: 'Error en el procesamiento', error: error.message });
      }
    }

    return res.status(400).json({ message: 'Notificación no reconocida' });
  }
}
