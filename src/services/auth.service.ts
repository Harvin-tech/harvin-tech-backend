// src/services/authService.ts

import { User } from '../models';
import { BcryptHelper } from '../utils/bcryptHelper';
import { TokenService } from './token.service';

export class AuthService {
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await BcryptHelper.hashPassword(password);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return user;
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ user: any; token: string }> {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await BcryptHelper.comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = TokenService.generateAccessToken(user);

    return { user, token };
  }
}
