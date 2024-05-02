import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersService.findOne(userId);

    if (!user || !user.hashdRt) throw new ForbiddenException('Access Denied.');

    const rtMatches = await bcrypt.compare(rt, user.hashdRt);

    if (!rtMatches) throw new ForbiddenException('Access Denied.');

    const tokens = await this.getTokens(user);

    const rtHash = await this.hashPassword(tokens.refresh_token);

    // await this.usersService.updateOne(user._id, { hashdRt: rtHash });
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

  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  async logIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string, refresh_token: string}> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email };

    const tokens = await this.getTokens(payload);

    return {
        ...tokens
    };
  }
}
