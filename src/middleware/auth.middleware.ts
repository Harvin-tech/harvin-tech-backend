// src/middleware/authMiddleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { TokenService } from '../services/token.service';

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
      try {
        const token = request.cookies.token;
        if (!token) {
          throw new Error('Authentication token missing');
        }

        const decoded = TokenService.verifyToken(token);

        if (!decoded) {
          return reply.status(401).send({
            message: 'Invalid token',
          });
        }

        request.user = decoded;
      } catch (err) {
        reply.status(401).send({ message: 'Unauthorized' });
      }
    }
  }
}
