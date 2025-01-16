import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { ProductModule } from './modules/Products/products.module';
import { CategoriesModule } from './modules/Categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './config/auth/auth.module';
import { OrderModule } from './modules/Orders/order.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from './config/mail.config';
import { PaymentsController } from './modules/Payments/payment.controller';
import { EmailService } from './modules/Mailing/email.service';
/* import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { MercadopagoService } from './mercadopago/mercadopago.service'; */

@Module({
  imports: [
    MailerModule.forRoot(mailConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    ProductModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    OrderModule,
    /* MercadopagoModule, */
  ],
  controllers: [PaymentsController],
  providers: [EmailService /* MercadopagoService */],
})
export class AppModule {}
