import { UsersService } from '../users/users.service';
export declare class SettingsService {
    private usersService;
    constructor(usersService: UsersService);
    setLanguage(userId: string, language: string): Promise<import("../users/user.schema").UserDocument>;
    translate(message: string, language: string): string;
}
