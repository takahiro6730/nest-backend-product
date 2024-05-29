
import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { LoggerService } from "../common/service/logger.service";


@Module({
  providers: [
    LoggerService
  ],
  controllers: [RolesController]
})
export class roleModule { }
