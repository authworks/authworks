import { Injectable } from '@nestjs/common';
import { stringify } from 'flatted';
import * as winston from 'winston';
import { ConfigService } from '../config/config.service';
import { LogLevel } from './types/LogLevel';
import { logger } from 'express-winston';
import { Handler } from 'express';

@Injectable()
export class LoggerService {
  logger: winston.Logger;
  expressLogger: Handler;

  constructor(private readonly config: ConfigService) {
    this.logger = winston.createLogger({
      level: config.get().log.level,
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
          handleExceptions: true,
        }),
      ],
    });
    this.expressLogger = logger({
      winstonInstance: this.logger,
      // @ts-ignore
      headerBlacklist: ['Authorization', 'Cookie'],
    });
  }

  private log(logLevel: LogLevel, message: string, ...data: any[]) {
    this.logger.log(logLevel, message, ...data);
  }

  public debug(message: string, ...data: any[]) {
    this.log('debug', message, ...data);
  }

  public info(message: string, ...data: any[]) {
    this.log('info', message, ...data);
  }

  public warn(message: string, ...data: any[]) {
    this.log('warn', message, ...data);
  }

  public error(message: string, ...data: any[]) {
    this.log('error', message, ...data);
  }

  private format(data: any): string {
    if (typeof data === 'object') {
      return stringify(data);
    }
    return String(data);
  }
}
