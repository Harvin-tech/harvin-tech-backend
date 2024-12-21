import { FastifyInstance } from 'fastify';
import {
  loginSchema,
  registerSchema,
  logoutSchema,
} from '../../schema/auth.schema';
import { AuthController } from '../../controllers/auth.controller';

export default async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerSchema, AuthController.register); // Register Route: POST '/auth/register'
  app.post('/login', loginSchema, AuthController.login); // Login Route: POST '/auth/login'
  app.post('/logout', logoutSchema, AuthController.logout); // Logout Route: POST '/auth/logout'
}
