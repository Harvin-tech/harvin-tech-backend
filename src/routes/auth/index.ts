// src/routes/authRoutes.ts
import { FastifyInstance } from 'fastify';
import {
  loginSchema,
  registerSchema,
  logoutSchema,
} from '../../schema/auth.schema';
import { AuthController } from '../../controllers/auth.controller';

export default async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerSchema, AuthController.register);

  app.post('/login', loginSchema, AuthController.login);

  app.post('/logout', logoutSchema, AuthController.logout);
}
