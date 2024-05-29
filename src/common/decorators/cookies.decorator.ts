import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CookiesDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);