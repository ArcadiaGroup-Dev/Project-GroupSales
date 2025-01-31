import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendSellRequestNotification(adminEmail: string, sellerEmail: string) {
    try {
      await this.mailerService.sendMail({
        to: adminEmail,
        subject: 'Nueva solicitud de venta',
        template: './sell-request',
        context: {
          sellerEmail,
        },
      });
      this.logger.log(
        'Notificación de solicitud de venta enviada correctamente.',
      );
    } catch (error) {
      this.logger.error(
        `Error al enviar la notificación de solicitud de venta: ${error.message}`,
      );
      throw new Error(
        'No se pudo enviar la notificación de solicitud de venta. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }

  async sendPurchaseConfirmation(
    buyerEmail: string,
    sellerEmail: string,
    adminEmail: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: [buyerEmail, sellerEmail, adminEmail],
        subject: 'Confirmación de compra',
        template: './purchase-confirmation',
        context: {
          buyerEmail,
          sellerEmail,
        },
      });
      this.logger.log('Confirmación de compra enviada correctamente.');
    } catch (error) {
      this.logger.error(
        `Error al enviar la confirmación de compra: ${error.message}`,
      );
      throw new Error(
        'No se pudo enviar la confirmación de compra. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    try {
      const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperación de Contraseña',
        template: './password-reset', 
        context: {
          resetUrl,
        },
      });

      this.logger.log('Correo de recuperación de contraseña enviado.');
    } catch (error) {
      this.logger.error(
        `Error al enviar el correo de recuperación: ${error.message}`,
      );
      throw new Error(
        'No se pudo enviar el correo de recuperación. Inténtelo de nuevo más tarde.',
      );
    }
  }
}
