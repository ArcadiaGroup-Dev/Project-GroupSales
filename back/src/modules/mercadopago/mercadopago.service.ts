import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import 'dotenv/config';

@Injectable()
export class MercadoPagoService {
  private mercadopago: MercadoPagoConfig;

  constructor() {
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error(
        'Falta la variable MERCADO_PAGO_ACCESS_TOKEN en el entorno',
      );
    }

    this.mercadopago = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });
  }

  async createPreference(preferenceData: any) {
    try {
      console.log(
        'Creando preferencia con:',
        JSON.stringify(preferenceData, null, 2),
      );

      const preference = new Preference(this.mercadopago);
      const response = await preference.create({ body: preferenceData });

      console.log('Preferencia creada:', response);
      return response;
    } catch (error) {
      console.error('Error creando la preferencia:', error.message);
      throw new Error(`Error creando la preferencia: ${error.message}`);
    }
  }

  async processWebhook(body: any) {
    console.log('📩 Webhook recibido:', JSON.stringify(body, null, 2));

    if (body.type === 'payment' && body.data.id) {
      return this.validatePayment(body.data.id);
    }

    console.warn('⚠️ Webhook de tipo no manejado:', body.type);
    return { message: 'Webhook recibido pero no procesado' };
  }

  async validatePayment(paymentId: string) {
    try {
      console.log(`🔍 Validando pago ID: ${paymentId}`);

      const payment = new Payment(this.mercadopago);
      const paymentData = await payment.get({ id: paymentId });

      console.log('📜 Datos del pago:', JSON.stringify(paymentData, null, 2));

      if (paymentData.status === 'approved') {
        console.log('✅ Pago aprobado');
        return { status: 'approved', message: 'Pago aprobado' };
      } else {
        console.log('❌ Pago NO aprobado:', paymentData.status);
        return { status: paymentData.status, message: 'Pago no aprobado' };
      }
    } catch (error) {
      console.error(`🚨 Error validando pago ID ${paymentId}:`, error.message);
      return {
        status: 'error',
        message: `Error validando pago: ${error.message}`,
      };
    }
  }
}
