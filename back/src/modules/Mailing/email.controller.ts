import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import {
  SendSellApprovalDto,
  SendSellRequestDto,
  SendAdminPromotionDto,
  PurchaseNotificationDto,
} from './email.dto';

@Controller('email') // Ruta base del controlador
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-sell-request') // Ruta para manejar la solicitud de venta
  async sendSellRequestNotification(
    @Body() sendSellRequestDto: SendSellRequestDto,
  ) {
    const { adminEmail, sellerEmail } = sendSellRequestDto;

    try {
      await this.emailService.sendSellRequestNotification(
        adminEmail,
        sellerEmail,
      );
      return { message: 'Correo enviado correctamente.' };
    } catch (error) {
      return { message: error.message }; // Maneja el error y lo devuelve en la respuesta
    }
  }

  @Post('send-sell-approval')
  async sendSellApprovalNotification(
    @Body() sendSellApprovalDto: SendSellApprovalDto,
  ) {
    const { adminEmail, sellerEmail } = sendSellApprovalDto;

    try {
      await this.emailService.sendSellApprovalNotification(
        adminEmail,
        sellerEmail,
      );
      return { message: 'Correo de aprobación enviado correctamente.' };
    } catch (error) {
      return { message: error.message };
    }
  }
  @Post('send-admin-promotion') // Nuevo endpoint para la promoción a administrador
  async sendAdminPromotionNotification(
    @Body() sendAdminPromotionDto: SendAdminPromotionDto,
  ) {
    const { adminEmail, sellerEmail } = sendAdminPromotionDto;

    try {
      // Llamamos al método correcto del servicio
      await this.emailService.sendSellApprovalAdmin(adminEmail, sellerEmail);
      return {
        message: 'Correo de promoción a administrador enviado correctamente.',
      };
    } catch (error) {
      return { message: error.message };
    }
  }

  @Post('send-purchase-notification')
  async sendPurchaseNotification(
    @Body() purchaseNotificationDto: PurchaseNotificationDto,
  ) {
    const { adminEmail, sellerEmail, userEmail, productDetails } =
      purchaseNotificationDto;

    console.log('Datos recibidos en el backend:');
    console.log('Admin Email:', adminEmail);
    console.log('Seller Email:', sellerEmail);
    console.log('User Email:', userEmail);
    console.log('Detalles de los productos:', productDetails);

    try {
      await this.emailService.sendPurchaseNotification(
        adminEmail,
        sellerEmail,
        userEmail,
        productDetails,
      );
      return {
        message: 'Correos de compra enviados correctamente.',
      };
    } catch (error) {
      return { message: error.message };
    }
  }
}
