import { UserRole } from '../../../enums/user-role.enum';
import { Types } from 'mongoose';
export declare class CreateUserDto {
    email: string;
    password?: string;
    role: UserRole;
    companyId?: string | Types.ObjectId;
    language?: string;
}
