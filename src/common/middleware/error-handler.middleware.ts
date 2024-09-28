// src/common/middleware/error-handler.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }

  // Handle error responses
  handleError(res: Response, error: any) {
    const response = {
      statusCode: error.status || 500,
      message: error.message || 'Internal Server Error',
    };
    res.status(response.statusCode).json(response);
  }
}
