import { Response } from 'express';
import { APIResponse } from '../types';

export class APIResponseUtil {
  static success<T>(res: Response, data: T, message?: string, statusCode = 200): Response {
    const response: APIResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date(),
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode = 500): Response {
    const response: APIResponse = {
      success: false,
      error,
      timestamp: new Date(),
    };
    return res.status(statusCode).json(response);
  }

  static notFound(res: Response, message = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static unauthorized(res: Response, message = 'Unauthorized'): Response {
    return this.error(res, message, 401);
  }

  static badRequest(res: Response, message = 'Bad request'): Response {
    return this.error(res, message, 400);
  }

  static created<T>(res: Response, data: T, message = 'Resource created successfully'): Response {
    return this.success(res, data, message, 201);
  }
}