import { FastifyRequest, FastifyReply } from 'fastify';
import { TokenService } from '../services/token.service';
import { createError } from '../hooks';
import { UNAUTHORIZED } from '../types/errors.type';

export class AuthMiddleware {
  static async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const publicRoute = request.url.startsWith('/public');
    const privateRoute = request.url.startsWith('/private');

    if (publicRoute) {
      return; // Allow public routes without authentication
    }

    if (privateRoute) {
      const authToken = request.cookies.token;
      const authHeader = request.headers.authorization;

      const token = authToken || authHeader?.split(' ')[1];
      if (!token) {
        throw createError(
          UNAUTHORIZED.name,
          UNAUTHORIZED.status,
          UNAUTHORIZED.message
        );
      }

      const decoded = TokenService.verifyToken(token);

      if (!decoded) {
        throw createError(
          UNAUTHORIZED.name,
          UNAUTHORIZED.status,
          UNAUTHORIZED.message
        );
      }

      request.user = decoded;
    }
  }
}
