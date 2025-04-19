import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument>;
    findAll(tenantId: string): Promise<UserDocument[]>;
    update(id: string, updateData: Partial<User>): Promise<UserDocument>;
    requestOtp(email: string, otp: string, expires: Date): Promise<UserDocument>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<UserDocument>;
    setInitialPassword(email: string, tempPassword: string, newPassword: string): Promise<UserDocument>;
    delete(id: string): Promise<void>;
    deleteByCompanyId(companyId: string): Promise<void>;
}
