import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service'
import { RouteInfo } from '@nestjs/common/interfaces';
import { request } from 'http';
import { v4 as uuid } from 'uuid';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const id: string = uuid();
    this.logger.log('NestMiddleware Called',id,'LoggerMiddleware.ts',req.method,req.originalUrl,'LoggerMiddleware');
    // Ends middleware function execution, hence allowing to move on 
    if (next) {
      next();
    }
  }
}