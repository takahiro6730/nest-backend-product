import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseFilters,
    UseGuards,
  } from "@nestjs/common";
import { AuthService } from './auth.service';
import { uuid } from "uuid";
import { Response } from "express";
import { sendResponse } from "src/utils";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    // const id: string = uuid();
    const token = await this.authService.logIn(
        signInDto.email,
        signInDto.password
      );
      console.log(token)
  
      res.cookie("access_token", token.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      });
  
      return sendResponse(
        res,
        HttpStatus.OK,
        'SUCCESS',
        true,
        token.access_token
      );
  }
}