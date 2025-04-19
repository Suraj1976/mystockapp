import { ClientsService } from '../clients/clients.service';
import { UsersService } from '../users/users.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { UserDocument } from '../users/user.schema';
export declare class ManagerService {
    private readonly clientsService;
    private readonly usersService;
    constructor(clientsService: ClientsService, usersService: UsersService);
    create(createManagerDto: CreateManagerDto): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findOne(id: string): Promise<UserDocument>;
    update(id: string, updateManagerDto: UpdateManagerDto): Promise<UserDocument>;
    remove(id: string): Promise<void>;
    getDashboardData(companyId: string): Promise<{
        totalClients: number;
        totalUsers: number;
    }>;
}
