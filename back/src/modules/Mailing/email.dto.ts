import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';

export class IProducto {
  name: string;
  quantity: number;
  price: number;
}

export class PurchaseNotificationDto {
  @IsEmail()
  adminEmail: string;

  @IsEmail()
  sellerEmail: string;

  @IsEmail()
  userEmail: string;

  @IsArray()
  productDetails: IProducto[];  
}

export class SendSellRequestDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Correo del administrador',
  })
  @IsEmail()
  adminEmail: string;

  @ApiProperty({
    example: 'seller@example.com',
    description: 'Correo del vendedor',
  })
  @IsEmail()
  sellerEmail: string;
}

export class SendAdminPromotionDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Correo del administrador',
  })
  @IsEmail()
  adminEmail: string;

  @ApiProperty({
    example: 'seller@example.com',
    description: 'Correo del vendedor',
  })
  @IsEmail()
  sellerEmail: string;
}

export class SendSellApprovalDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Correo del administrador',
  })
  @IsEmail()
  adminEmail: string;

  @ApiProperty({
    example: 'seller@example.com',
    description: 'Correo del vendedor',
  })
  @IsEmail()
  sellerEmail: string;
}

export class SendPurchaseConfirmationDto {
  @ApiProperty({
    example: 'buyer@example.com',
    description: 'Correo del comprador',
  })
  @IsEmail()
  buyerEmail: string;

  @ApiProperty({
    example: 'seller@example.com',
    description: 'Correo del vendedor',
  })
  @IsEmail()
  sellerEmail: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Correo del administrador',
  })
  @IsEmail()
  adminEmail: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'random-token-123456',
    description: 'Token de recuperación de contraseña',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'newSecurePassword123',
    description: 'Nueva contraseña',
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
