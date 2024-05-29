
import { Module } from "@nestjs/common";
import { HelloController } from "./hello.controller";
import { LoggerService } from "../common/service/logger.service";


@Module({

  providers: [
    LoggerService
  ],
  controllers: [HelloController]
})
export class helloModule {}
