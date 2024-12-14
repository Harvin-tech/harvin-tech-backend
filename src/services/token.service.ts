// src/services/tokenService.ts
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';


export class TokenService {
  static generateAccessToken(user: any): string {
    return jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      }, 
      ENV.JWT_SECRET, 
      { 
        expiresIn: ENV.JWT_EXPIRATION 
      }
    );
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, ENV.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}