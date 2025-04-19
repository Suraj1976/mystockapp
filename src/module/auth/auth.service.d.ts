import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private emailService;
    constructor(usersService: UsersService, jwtService: JwtService, emailService: EmailService);
    registerSuperAdmin(email: string, password: string): Promise<{
        message: string;
        userId: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        isFirstLogin: boolean;
    }>;
    changePassword(email: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    requestOtp(email: string): Promise<{
        message: string;
    }>;
}
