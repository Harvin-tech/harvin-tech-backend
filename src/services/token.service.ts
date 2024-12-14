import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { tokenUserSign_I } from '../types/auth.type';

export class TokenService {
  static generateAccessToken(user: tokenUserSign_I): string {
    return jwt.sign(user, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRATION,
    });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, ENV.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}
