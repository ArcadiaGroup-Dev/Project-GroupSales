import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import 'dotenv/config';

@Injectable()
export class MercadoPagoService {
  private mercadopago: MercadoPagoConfig;

  constructor() {
    this.mercadopago = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
    });
  }

  async createPreference(preferenceData: any) {
    try {
      const preference = new Preference(this.mercadopago);
      const response = await preference.create({ body: preferenceData });
      return response;
    } catch (error) {
      throw new Error(`Error creating preference: ${error.message}`);
    }
  }


  async processWebhook(body: any) {
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      console.log('Notificación de pago recibida. ID:', paymentId);
      return this.validatePayment(paymentId);
    }
    return { message: 'Webhook recibido y procesado' };
  }

  async validatePayment(paymentId: string) {
    try {
      const payment = new Payment(this.mercadopago);
      const paymentData = await payment.get({ id: paymentId });
      console.log('Datos del pago:', paymentData);

      // Aquí puedes validar el estado del pago
      if (paymentData.status === 'approved') {
        console.log('Pago aprobado.');
        // Aquí puedes actualizar tu base de datos o realizar otras acciones necesarias
        return { message: 'Pago aprobado' };
      } else {
        console.log('Pago no aprobado. Estado:', paymentData.status);
        return { message: 'Pago no aprobado' };
      }
    } catch (error) {
      console.error(`Error al validar el pago: ${error.message}`);
      throw new Error(`Error al validar el pago: ${error.message}`);
    }
  }
}
