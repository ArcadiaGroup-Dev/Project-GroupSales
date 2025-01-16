import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailService } from '../Mailing/email.service';

class SellRequestDto {
  sellerEmail: string;
}

class PurchaseConfirmationDto {
  buyerEmail: string;
  sellerEmail: string;
}

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sell-request')
  @ApiOperation({ summary: 'Notificar solicitud de venta' })
  @ApiResponse({
    status: 201,
    description: 'Notificación de solicitud de venta enviada.',
  })
  @ApiBody({ type: SellRequestDto })
  async notifySellRequest(@Body() body: SellRequestDto) {
    const adminEmail = 'admin@example.com';
    await this.emailService.sendSellRequestNotification(
      adminEmail,
      body.sellerEmail,
    );
    return { message: 'Notificación de solicitud de venta enviada.' };
  }

  @Post('purchase-confirmation')
  @ApiOperation({ summary: 'Notificar confirmación de compra' })
  @ApiResponse({
    status: 201,
    description: 'Confirmación de compra enviada.',
  })
  @ApiBody({ type: PurchaseConfirmationDto })
  async notifyPurchaseConfirmation(@Body() body: PurchaseConfirmationDto) {
    const adminEmail = 'admin@example.com';
    await this.emailService.sendPurchaseConfirmation(
      body.buyerEmail,
      body.sellerEmail,
      adminEmail,
    );
    return { message: 'Confirmación de compra enviada.' };
  }
}
