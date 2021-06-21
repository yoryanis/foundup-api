import { ConfigService } from '../config/config.service';
import { UserEntity } from 'src/entities';
import { UserService } from './user.service';
import { JwtPayload } from '../entities/interfaces/jwt-payload.interface';
import { ApiResponse } from 'src/responses';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    createToken(user: UserEntity): ApiResponse<any>;
    validateUserToken(payload: JwtPayload): Promise<UserEntity>;
    validateUser(email: string, password: string): Promise<any>;
}
