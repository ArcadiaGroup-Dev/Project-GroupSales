import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
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

  
}
