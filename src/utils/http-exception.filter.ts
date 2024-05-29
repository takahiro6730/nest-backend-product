import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


/**
 * 
 * catch error in for controller
 */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
   
    const message = exception.message || exception.getResponse()['message'] || 'Internal Server Error';
    let error :any = exception.getResponse();

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        error: error?.message || 'Internal Server Error',
        timestamp: new Date().toISOString(),
        path: request.url,
        isSuccess: false,
        data : null
      });
  }
}