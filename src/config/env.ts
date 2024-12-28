import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT) || 8082,
  NODE_ENV: process.env.NODE_ENV || 'development',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'your-cookie-secret',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '7d',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3002',
};
