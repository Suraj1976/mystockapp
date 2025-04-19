import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto//update-manager.dto';
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    create(createManagerDto: CreateManagerDto): Promise<import("../users/user.schema").UserDocument>;
    findAll(): Promise<import("../users/user.schema").UserDocument[]>;
    findOne(id: string): Promise<import("../users/user.schema").UserDocument>;
    update(id: string, updateManagerDto: UpdateManagerDto): Promise<import("../users/user.schema").UserDocument>;
    remove(id: string): Promise<void>;
    getDashboardData(req: any): Promise<{
        totalClients: number;
        totalUsers: number;
    }>;
}
