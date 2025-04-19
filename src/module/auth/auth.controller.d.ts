import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        isFirstLogin: boolean;
    }>;
    registerSuperAdmin(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        userId: string;
    }>;
    changePassword(body: {
        email: string;
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
