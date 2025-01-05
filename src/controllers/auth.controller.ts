// src/controllers/authController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';
import { readBody, sendResponse } from '../hooks';
import { registerUser_I } from '../types/auth.type';
import { ENV } from '../config/env';

export class AuthController {
  static async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = readBody<registerUser_I>(request);

      const user = await AuthService.register(requestBody);

      return sendResponse(reply, 201, 'User registered successfully', user);
    } catch (error) {
      throw error;
    }
  }

  static async login(
    request: FastifyRequest<{
      Body: { email: string; password: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { email, password } = request.body;
      const { user, token } = await AuthService.login(email, password);

      // Set secure, HTTP-only cookie
      reply.setCookie('token', token, {
        path: '/',
        httpOnly: false, // allow client to access the cookie
        secure: ENV.NODE_ENV === 'production', // only send over HTTPS in production
        sameSite: 'strict', // protect against CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const { password: _password, ...userResponse } = user;

      return sendResponse(reply, 200, 'Login successful', userResponse);
    } catch (error) {
      throw error;
    }
  }

  static async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Clear the token cookie
      reply.clearCookie('token', {
        path: '/',
        httpOnly: false,
        secure: ENV.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return sendResponse(reply, 200, 'Logged out successfully');
    } catch (error) {
      throw error;
    }
  }
}
