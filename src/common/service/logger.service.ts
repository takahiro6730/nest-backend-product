import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({
            level,
            message,
            correlationId = null,
            filename= null,
            method= null,
            url = null,
            functionName= null,
            timestamp
          }) => {
            return JSON.stringify({
              level: `${level.toUpperCase()}`,
              message:`${message}`,
              correlationId: `${correlationId}`,
              filename: `${filename}`,
              method: `${method}`,
              url:`${url}`,
              functionName:`${functionName}`,
              timestamp
            });
          }
        )
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: "logs",
          filename: "application-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
        })
      ],
    });
  }

  log(message: string,correlationId?: string,filename?: string,method?: string,url?: string,functionName?: string) {
    this.logger.info(message, { correlationId, filename, method,url, functionName});
  }
}
