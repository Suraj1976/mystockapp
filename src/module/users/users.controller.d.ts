import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<import("./user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./user.schema").UserDocument>;
    requestResetPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        otp: string;
        newPassword: string;
    }): Promise<import("./user.schema").UserDocument>;
    setPassword(body: {
        email: string;
        tempPassword: string;
        newPassword: string;
    }): Promise<import("./user.schema").UserDocument>;
}
