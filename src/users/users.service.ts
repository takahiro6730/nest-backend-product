import { Injectable } from "@nestjs/common";
import { LoggerService } from '../common/service/logger.service';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { RefresToken } from "./schemas/refreshtoken.schema";
import * as bcrypt from "bcrypt";
import { userData } from "src/interface/common";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefresToken.name)
    private readonly RefresTokenModel: Model<RefresToken>,
    private readonly logger: LoggerService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const id: string = uuid();
    this.logger.log('User service create called', id, 'users.service.ts', '', '', 'create-service');
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );
    createUserDto.password = hashedPassword;
    createUserDto.email_code = (Math.floor(Math.random() * (9000000)) + 1000000).toString();
    const createduUser = await this.userModel.create(createUserDto);
    return createduUser;
  }

  async findAll(): Promise<userData[]> {
    const id: string = uuid();
    this.logger.log('User service findall called', id, 'users.service.ts', '', '', 'findAll-service');
    return this.userModel.find().exec();
  }

  async findOne(id: string, projection = {}): Promise<userData> {
    return this.userModel.findOne({ _id: id }, projection).exec();
  }

  async findOneUser(email: string): Promise<userData> {
    return this.userModel.findOne({ email: email }).exec();
  }
  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedUser;
  }

  async updateOne(userId: Types.ObjectId | String, data: userData) {
    await this.userModel.updateOne({ _id: userId }, data);
  }

  async createRefreshToken(createUserDto: CreateUserDto): Promise<Boolean> {
    const createduUser = await this.RefresTokenModel.create(createUserDto);
    return true;
  }
}
