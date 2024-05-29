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
import { LoggerService } from "../common/service/logger.service";
import { SignInDto } from "./dto/signIn.dto";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { RtGuard } from "../common/guards/rt.guard";
import { v4 as uuid } from "uuid";
import {
  sendResponse,
  loginSuccessResponse,
  loginErrorResponse,
  refreshErrorResponse,
} from "../utils/index";
import { statusMessage } from "../constant/statusMessage";
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetCurrentUser, GetCurrentUserId } from "../common/decorators";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  [x: string]: any;
  constructor(
    private authService: AuthService,
    private readonly logger: LoggerService
  ) { }

  @ApiResponse(loginSuccessResponse)
  @ApiResponse(loginErrorResponse)
  @Public()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Post("login")
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const id: string = uuid();
    this.logger.log(
      "User login api called",
      id,
      "auth.controler.ts",
      "POST",
      "/login",
      "signIn"
    );
    const token = await this.authService.signIn(
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

    res.cookie("refresh_token", token.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    });

    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      token
    );
  }

  @ApiResponse(loginSuccessResponse)
  @ApiResponse(refreshErrorResponse)
  @ApiCookieAuth("refresh_token")
  @ApiBearerAuth("JWT-auth")
  @Public()
  @UseGuards(RtGuard)
  @Post("/refresh")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async refreshTokens(
    @GetCurrentUser("user") payload: any,
    @GetCurrentUser("user") userId: string,
    @Res() res: Response
  ) {
    const token = await this.authService.getTokens(payload);
    const id: string = uuid();
    this.logger.log(
      "User refresh api called",
      id,
      "auth.controler.ts",
      "POST",
      "/refresh",
      "refreshTokens"
    );
    res.cookie("access_token", token.access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      secure: true,
    });

    res.cookie("refresh_token", token.refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",

      secure: true,
    });

    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      token
    );
  }

  @ApiResponse(loginSuccessResponse)
  @ApiResponse(loginErrorResponse)
  @Public()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  @Post("logout")
  async logout(@Body() signInDto: SignInDto, @Res() res: Response) {
    const id: string = uuid();
    this.logger.log(
      "User logout api called",
      id,
      "auth.controler.ts",
      "POST",
      "/logout",
      "logout"
    );

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("uid");
    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      null
    );
  }
}
