import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Category } from 'src/models/Categories/entities/categories.entity';
import { Product } from 'src/models/Products/entities/products.entities';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });

const config: DataSourceOptions = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dropSchema: false,
    logging: true,
    synchronize: true,
    entities: [Product,Category],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  };
  

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
