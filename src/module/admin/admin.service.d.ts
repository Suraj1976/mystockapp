import { UsersService } from '../users/users.service';
import { UserRole } from '../../enums/user-role.enum';
import { UserDocument } from '../users/user.schema';
export declare class AdminService {
    private usersService;
    constructor(usersService: UsersService);
    createAdmin(email: string, companyId: string, role?: UserRole): Promise<{
        userId: string;
        tempPassword: string;
    }>;
    getAdminDetails(userId: string): Promise<UserDocument>;
}
