/*import { Injectable } from '@nestjs/common';
import mercadopago from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  constructor() {
    mercadopago.accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN; // Token de acceso
  }

  async createPreference(preferenceData: any) {
    try {
      const response = await mercadopago.preferences.create(preferenceData);
      return response.body;
    } catch (error) {
      throw new Error(`Error creating preference: ${error.message}`);
    }
  }
}
*/
