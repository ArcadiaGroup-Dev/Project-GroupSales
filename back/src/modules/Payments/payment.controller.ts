import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../Mailing/email.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sell-request')
  async notifySellRequest(@Body() body: { sellerEmail: string }) {
    const adminEmail = 'admin@example.com';
    await this.emailService.sendSellRequestNotification(
      adminEmail,
      body.sellerEmail,
    );
    return { message: 'Notificación de solicitud de venta enviada.' };
  }

  @Post('purchase-confirmation')
  async notifyPurchaseConfirmation(
    @Body() body: { buyerEmail: string; sellerEmail: string },
  ) {
    const adminEmail = 'admin@example.com';
    await this.emailService.sendPurchaseConfirmation(
      body.buyerEmail,
      body.sellerEmail,
      adminEmail,
    );
    return { message: 'Confirmación de compra enviada.' };
  }
}
