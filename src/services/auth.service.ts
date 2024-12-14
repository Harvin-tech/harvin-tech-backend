// src/services/authService.ts

import { createError } from '../hooks';
import { User } from '../models';
import { registerUser_I, tokenUserSign_I } from '../types/auth.type';
import { BcryptHelper } from '../utils/bcryptHelper';
import { TokenService } from './token.service';

export class AuthService {
  static async register(data: registerUser_I): Promise<any> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      throw createError(
        'USER_ALREADY_EXISTS',
        400,
        'User already exists Try login'
      );
    }

    // Hash password
    const hashedPassword = await BcryptHelper.hashPassword(data.password);

    // Create new user
    const user = new User({
      ...data,
      password: hashedPassword,
    });

    await user.save();

    const { password, ...restData } = user['_doc'];

    const response = {
      user: {
        ...restData,
      },
    };

    return response;
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ user: any; token: string }> {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw createError('INVALID_CREDENTIALS', 400, 'Invalid credentials');
    }

    // Check password
    const isMatch = await BcryptHelper.comparePassword(password, user.password);

    if (!isMatch) {
      throw createError('INVALID_CREDENTIALS', 400, 'Invalid credentials');
    }

    const tokenUser: tokenUserSign_I = {
      id: String(user._id),
      email: user.email,
      role: user.role,
    };

    // Generate token
    const token = TokenService.generateAccessToken(tokenUser);

    const { password: _password, ...restData } = user['_doc'];
    const response = {
      ...restData,
    };
    return { user: response, token };
  }
}
