import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoggerService } from '../common/service/logger.service';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../auth/constants';
import { v4 as uuid } from 'uuid';
import { sendResponse } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly logger: LoggerService
  ) { }

  async signIn(email: string, pass: string) {

    const id: string = uuid();
    this.logger.log('auth service api called', id, 'auth.service.ts', '', '', 'signIn-service');
    const user = await this.usersService.findOneUser(email);
    if (!user) {
      throw new UnauthorizedException('Username and password wrong.');
    }

    const match = await bcrypt.compare(pass, user?.password);
    if (match) {
      const payload = { email: user.email, userId: user._id.toString(), username: user.username };
      const tokens = await this.getTokens(payload);
      return {
        ...tokens
      };
    }

  }


  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.findOne(userId);

    if (!user || !user.hashdRt) throw new ForbiddenException('Access Denied.');

    const rtMatches = await bcrypt.compare(rt, user.hashdRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user);

    const rtHash = await this.hashPassword(tokens.refresh_token);

    await this.usersService.updateOne(user._id, { hashdRt: rtHash });
    return tokens;
  }

  async getTokens(user: any) {

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email,
          username: user.username
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '24h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email,
          username: user.username
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  //Encriptación de la copntraseña
  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }
}
