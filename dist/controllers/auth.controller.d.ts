import { AuthService, UserService } from '../services';
import { LoginUserDto } from '../entities/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UserService);
    login(login: LoginUserDto): Promise<import("../responses").ApiResponse<any>>;
}
