import { UserRole } from '../../../enums/user-role.enum';
import { Types } from 'mongoose';

export class UpdateUserDto {
  email?: string;
  password?: string;
  role?: UserRole;
  companyId?: string | Types.ObjectId; // Changed to support string or ObjectId
  language?: string;
}