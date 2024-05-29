import { Controller, Get, Injectable } from '@nestjs/common';
import { Public } from "../common/decorators";
import { HttpCode } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { v4 as uuid } from 'uuid';


@Injectable()
@Controller('')
export class HelloController {
  constructor(
    private readonly logger: LoggerService
  ) { }

  @Public()
  @HttpCode(200)
  @Get()
  async helloWorld(): Promise<string> {
    const id: string = uuid();
    this.logger.log('Hello world controller called', id, 'hello.controler.ts', 'GET', '/', 'helloWorld');
    return 'Hello World!';
  }
}
