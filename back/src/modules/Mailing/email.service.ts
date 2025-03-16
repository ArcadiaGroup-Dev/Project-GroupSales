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
        subject: 'Haz recibido una solicitud de usuario para ser vendedor',
        template: './sell-request-admin-seller',
        context: {
          sellerEmail,
        },
      });
      await this.mailerService.sendMail({
        to: sellerEmail,
        subject:
          'Solicitud de permiso enviada al administrador, pronto tendrás novedades',
        template: './sell-request-seller', // Usar la misma plantilla o una diferente para el vendedor
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
      const resetUrl = `http://localhost:3001/resetPassword?token=${token}`;

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

  // Nuevo método para enviar la notificación de aprobación
  async sendSellApprovalNotification(adminEmail: string, sellerEmail: string) {
    try {
      // Enviar correo al administrador
      await this.mailerService.sendMail({
        to: adminEmail,
        subject: 'Solicitud de permiso aprobada',
        template: './sell-approval-admin', // Plantilla para el administrador
        context: {
          sellerEmail,
        },
      });

      // Enviar correo al vendedor
      await this.mailerService.sendMail({
        to: sellerEmail,
        subject: 'Tu solicitud de permiso ha sido aprobada',
        template: './sell-approval-seller', // Plantilla para el vendedor
        context: {
          sellerEmail,
        },
      });

      this.logger.log('Notificación de aprobación enviada correctamente.');
    } catch (error) {
      this.logger.error(
        `Error al enviar la notificación de aprobación: ${error.message}`,
      );
      throw new Error(
        'No se pudo enviar la notificación de aprobación. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }

  // Nuevo método para enviar la notificación de aprobación de administrador
  async sendSellApprovalAdmin(adminEmail: string, sellerEmail: string) {
    try {
      // Enviar correo al administrador
      await this.mailerService.sendMail({
        to: adminEmail,
        subject: 'Solicitud de permiso aprobada',
        template: './sell-approval-admin-admin', // Plantilla para el administrador
        context: {
          sellerEmail,
        },
      });

      // Enviar correo al vendedor
      await this.mailerService.sendMail({
        to: sellerEmail,
        subject: 'Tu solicitud de permiso ha sido aprobada',
        template: './sell-approval-usertoadmin', // Plantilla para el vendedor
        context: {
          sellerEmail,
        },
      });

      this.logger.log('Notificación de aprobación enviada correctamente.');
    } catch (error) {
      this.logger.error(
        `Error al enviar la notificación de aprobación: ${error.message}`,
      );
      throw new Error(
        'No se pudo enviar la notificación de aprobación. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }
  async sendPurchaseNotification(
    adminEmail: string,
    sellerEmail: string,
    userEmail: string,
    productDetails: any,
  ) {
    try {
      console.log('Detalles de productos recibidos en el servicio:');
      console.log(productDetails);

      await this.mailerService.sendMail({
        to: adminEmail,
        subject: 'Nueva compra realizada',
        template: './purchase-admin',
        context: {
          productDetails,
        },
      });

      await this.mailerService.sendMail({
        to: sellerEmail,
        subject: 'Una compra ha sido realizada en tu tienda',
        template: './purchase-seller',
        context: {
          productDetails,
        },
      });

      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Gracias por tu compra',
        template: './purchase-user',
        context: {
          productDetails,
        },
      });

      this.logger.log('Notificación de compra enviada correctamente.');
    } catch (error) {
      this.logger.error(
        `Error al enviar la notificación de compra: ${error.message}`,
      );
      throw new Error(
        'No se pudo enviar la notificación de compra. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }
}
