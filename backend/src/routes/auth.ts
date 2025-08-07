import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthUtil } from '../utils/auth';
import { APIResponseUtil } from '../utils/response';
import { User } from '../database/models/User';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return APIResponseUtil.badRequest(res, 'Email and password are required');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return APIResponseUtil.unauthorized(res, 'Invalid credentials');
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return APIResponseUtil.unauthorized(res, 'Invalid credentials');
    }

    const token = AuthUtil.generateToken(user.id);
    const authResponse: AuthResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isActive: true,
        preferences: user.preferences,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token,
      expiresIn: '24h',
    };

    return APIResponseUtil.success(res, authResponse, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return APIResponseUtil.error(res, 'Internal server error');
  }
});

// POST /api/auth/register
router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return APIResponseUtil.badRequest(res, 'Name, email, and password are required');
    }

    if (password.length < 8) {
      return APIResponseUtil.badRequest(res, 'Password must be at least 8 characters');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return APIResponseUtil.badRequest(res, 'User with this email already exists');
    }

    const newUser = await User.create({
      name,
      email,
      password, // Will be hashed by the model's BeforeCreate hook
      preferences: {
        emailNotifications: true,
        studyReminders: true,
        theme: 'light',
      },
    });

    const token = AuthUtil.generateToken(newUser.id);
    const authResponse: AuthResponse = {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        isActive: true,
        preferences: newUser.preferences,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      },
      token,
      expiresIn: '24h',
    };

    return APIResponseUtil.created(res, authResponse, 'Registration successful');
  } catch (error) {
    console.error('Registration error:', error);
    return APIResponseUtil.error(res, 'Internal server error');
  }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  // In a real app, you might blacklist the token or update user session
  return APIResponseUtil.success(res, null, 'Logout successful');
});

export default router;