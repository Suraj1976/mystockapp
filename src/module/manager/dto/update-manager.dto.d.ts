import { UserRole } from '../../../enums/user-role.enum';
import { Types } from 'mongoose';
export declare class UpdateManagerDto {
    email?: string;
    role?: UserRole.MANAGER;
    companyId?: string | Types.ObjectId;
}
