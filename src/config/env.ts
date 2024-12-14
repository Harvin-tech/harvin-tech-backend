// src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp',
};