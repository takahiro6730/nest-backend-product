import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Public } from "../common/decorators";
import { LoggerService } from '../common/service/logger.service';
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Request, Response } from "express";
import {
  sendResponse,
  userErrorResponse,
  userListSuccessResponse,
  userSuccessResponse,
} from "../utils";
import { statusMessage } from "../constant/statusMessage";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { UserRequest, responseData, userData } from "../interface/common";
import { AuthGuard } from "../common/guards/at.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { v4 as uuid } from 'uuid';
import { EmailService } from '../common/service/mail.service';

@ApiTags("users")
@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly logger: LoggerService,
    private readonly mailer: EmailService) { }

  @ApiOperation({
    summary: "Create user",
    description: "User signup app",
  })
  @ApiResponse(userSuccessResponse)
  @ApiResponse(userErrorResponse)
  @Public()
  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createCatDto: CreateUserDto,
    @Res() res: Response
  ): Promise<responseData> {
    const id: string = uuid();
    this.logger.log('User create api called', id, 'users.controler.ts', 'POST', '/users', 'create');
    const user = await this.userService.create(createCatDto);
    const isMAil = process.env.IS_EMAIL
    console.log('##############', isMAil)
    if (isMAil === "true") {
      await this.mailer.sendEmailVerification(user.email, user.email_code)
    }
    return sendResponse(
      res,
      HttpStatus.CREATED,
      statusMessage[HttpStatus.CREATED],
      true,
      user
    );
  }

  // get user
  @ApiOperation({
    summary: "User List",
    description: "Get User List",
  })
  @ApiResponse(userListSuccessResponse)
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard)
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(@Res() res: Response): Promise<userData[]> {
    const id: string = uuid();
    this.logger.log('User list api called', id, 'users.controler.ts', 'GET', '/users', 'findAll');
    const userList = await this.userService.findAll();
    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      userList
    );
  }


  // get user
  @ApiOperation({
    summary: "User List",
    description: "Get User List",
  })
  @ApiResponse(userListSuccessResponse)
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard)
  @Get('getuser')
  @UseFilters(new HttpExceptionFilter())
  async findUser(@Query('userid') name: string, @Req() req: UserRequest, @Res() res: Response): Promise<any> {
    const id: string = uuid();
    this.logger.log('find User api called', id, 'users.controler.ts', 'GET', '/getuser', 'findUser');

    let userid: string = null;
    if (userid) {
      userid = userid;
    } else {
      userid = req.user.sub
    }
    userid = req.user.sub
    let projection = { _id: 1, first_name: 1, last_name: 1, email: 1 }
    const userList = await this.userService.findOne(userid, projection);
    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      userList
    );
  }

}
