import { Controller, Get, Injectable } from '@nestjs/common';
import { Public } from "../common/decorators";
import { HttpCode } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { v4 as uuid } from 'uuid';


@Injectable()
@Controller('v1/roles')
export class RolesController {
  constructor(
    private readonly logger: LoggerService
  ) { }

  @Public()
  @HttpCode(200)
  @Get()
  async helloWorld(): Promise<string> {
    const id: string = uuid();
    this.logger.log('roles controller called', id, 'roles.controler.ts', 'GET', '/', 'roles');
    return 'Hello World!';
  }
}
