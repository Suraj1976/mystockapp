import { CsvService } from './formats/csv.service';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { ClientsService } from '../clients/clients.service';
export declare class ExportService {
    private csvService;
    private usersService;
    private companiesService;
    private clientsService;
    constructor(csvService: CsvService, usersService: UsersService, companiesService: CompaniesService, clientsService: ClientsService);
    exportUsers(tenantId: string): Promise<string>;
    exportCompanies(tenantId: string): Promise<string>;
    exportClients(tenantId: string): Promise<string>;
}
