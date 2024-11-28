import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { ProductModule } from './modules/Products/products.module';
import { CategoriesModule } from './modules/Categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './config/auth/auth.module';




@Module({
  imports: [
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
    AuthModule
  ],
})



export class AppModule {}

