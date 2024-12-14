// src/controllers/authController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';


export class AuthController {
  static async register(
    request: FastifyRequest<{
      Body: { username: string; email: string; password: string }
    }>, 
    reply: FastifyReply
  ) {
    try {
      const { username, email, password } = request.body;
      const user = await AuthService.register(username, email, password);
      
      reply.status(201).send({
        message: 'User registered successfully',
        userId: user._id
      });
    } catch (error) {
      reply.status(400).send({ 
        message: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  }

  static async login(
    request: FastifyRequest<{
      Body: { email: string; password: string }
    }>, 
    reply: FastifyReply
  ) {
    try {
      const { email, password } = request.body;
      const { user, token } = await AuthService.login(email, password);
      
      // Set secure, HTTP-only cookie
      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
        sameSite: 'strict', // protect against CSRF
        maxAge: 3600 // 1 hour
      });

      reply.status(200).send({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      reply.status(401).send({ 
        message: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  }

  static async logout(
    request: FastifyRequest, 
    reply: FastifyReply
  ) {
    // Clear the token cookie
    reply.clearCookie('token', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    reply.status(200).send({ 
      message: 'Logged out successfully' 
    });
  }

  static async getPrivateData(
    request: FastifyRequest, 
    reply: FastifyReply
  ) {
    // This route is protected and can only be accessed by authenticated users
    return {
      message: 'This is private data',
      user: request.user
    };
  }
}