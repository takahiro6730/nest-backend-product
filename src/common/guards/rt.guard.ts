import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../../auth/constants';

@Injectable()
export class RtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = this.extractTokenFromCookie(request);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.secret,
      });

      if (payload) {
        delete payload.iat;
        delete payload.exp;
      }
      request["user"] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    let isCookieAuth = `${process.env.IS_COOKIE_AUTH}`;
    let token = undefined;
    if (isCookieAuth === "true") {
      token = request?.cookies?.refresh_token ?? null;
    } else {
      const [type, tokenValue] =
      request.headers.authorization?.split(" ") ?? [];
      token = type === "Bearer" ? tokenValue : undefined;
    }
    return token ? token : undefined;
  }
}
