import { FastifyRequest, FastifyReply } from 'fastify';
import { TokenService } from '../services/token.service';
import { createError } from '../hooks';
import { UNAUTHORIZED } from '../types/errors.type';

declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}

export class AuthMiddleware {
  static async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const publicRoute = request.url.startsWith('/public');
    const privateRoute = request.url.startsWith('/private');

    if (publicRoute) {
      return; // Allow public routes without authentication
    }

    if (privateRoute) {
      const token = request.cookies.token;
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
