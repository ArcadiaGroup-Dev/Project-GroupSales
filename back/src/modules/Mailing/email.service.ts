import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSellRequestNotification(adminEmail: string, sellerEmail: string) {
    await this.mailerService.sendMail({
      to: adminEmail,
      subject: 'Nueva solicitud de venta',
      template: './sell-request',
      context: {
        sellerEmail,
      },
    });
  }

  async sendPurchaseConfirmation(
    buyerEmail: string,
    sellerEmail: string,
    adminEmail: string,
  ) {
    await this.mailerService.sendMail({
      to: [buyerEmail, sellerEmail, adminEmail],
      subject: 'Confirmación de compra',
      template: './purchase-confirmation',
      context: {
        buyerEmail,
        sellerEmail,
      },
    });
  }
}
