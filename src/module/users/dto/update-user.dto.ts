import { Types } from 'mongoose';

export class UpdateUserDto {
  email?: string;
  role?: string;
  companyId?: Types.ObjectId; // companyId को ObjectId टाइप किया
  language?: string; // language प्रॉपर्टी जोड़ी
}