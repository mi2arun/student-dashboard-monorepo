import { Request, Response, NextFunction } from 'express';
import { AuthUtil } from '../utils/auth';
import { APIResponseUtil } from '../utils/response';
import { User } from '../database/models/User';

interface AuthenticatedRequest extends Request {
  user?: any;
  userId?: string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      APIResponseUtil.unauthorized(res, 'Access token required');
      return;
    }

    const decoded = AuthUtil.verifyToken(token);
    if (!decoded) {
      APIResponseUtil.unauthorized(res, 'Invalid or expired token');
      return;
    }

    // Verify user still exists in database
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      APIResponseUtil.unauthorized(res, 'User not found or inactive');
      return;
    }

    req.userId = decoded.userId;
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      preferences: user.preferences
    };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    APIResponseUtil.unauthorized(res, 'Authentication failed');
  }
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = AuthUtil.verifyToken(token);
      if (decoded) {
        const user = await User.findByPk(decoded.userId);
        if (user) {
          req.userId = decoded.userId;
          req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            preferences: user.preferences
          };
        }
      }
    }
  } catch (error) {
    console.error('Optional auth error:', error);
    // Don't fail on optional auth errors, just continue without user
  }

  next();
};