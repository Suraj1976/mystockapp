import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createAdmin(body: {
        email: string;
        companyId: string;
    }): Promise<{
        userId: string;
        tempPassword: string;
    }>;
    getAdminDetails(userId: string): Promise<import("../users/user.schema").UserDocument>;
}
