import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/entities';
import { UserService } from './user.service';
import { JwtPayload } from '../entities/interfaces/jwt-payload.interface';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { Configuration } from 'src/config/constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  createToken(user: UserEntity) {
    const expiresIn = 86400;

    const accessToken = jwt.sign(
      {
        ...user,
      },
      this.configService.get(Configuration.JWT_ENCRYPTION),
      { expiresIn },
    );

    return new ApiResponse(true, SUCCESS.USER_LOGIN, {
      expiresIn,
      accessToken,
    });
  }

  async validateUserToken(payload: JwtPayload): Promise<UserEntity> {
    return await this.userService.getByIdentification(payload.identification);
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;

      return new ApiResponse(true, SUCCESS.USER_VALIDATE, result);
    }
    return null;
  }
}
