import { Module } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { UserModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../common/guards/at.guard';
import { AuthService } from './auth.service';


@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    LoggerService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
