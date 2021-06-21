import { ConfigService } from '../../config/config.service';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../../services/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: any, done: Function): Promise<any>;
}
export {};
