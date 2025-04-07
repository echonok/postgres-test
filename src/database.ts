import { DataSource } from 'typeorm';
import { config } from 'dotenv';

import { User } from './entities/User.entity';

config();

export const { NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: NODE_ENV === 'development',
  logging: NODE_ENV === 'development',
  entities: [User],
  migrations: ['./migrations/*.ts'], // Optional, for migrations
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch((error) => console.error('Database connection error:', error));
