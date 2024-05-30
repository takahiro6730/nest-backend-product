import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LoggerService } from "./common/service/logger.service";
import { LoggerMiddleware } from "./common/service/loggermiddleware.service";
import { DatabaseModule } from "./config/database.module";
import { helloModule } from "./hello/hello.module";
import { roleModule } from "./roles/roles.module";
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${process.env.MONGODB_URI}`
    ),
    DatabaseModule,
    UserModule,
    AuthModule,
    helloModule,
    roleModule,
    BlogModule,
  ],
  providers: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
