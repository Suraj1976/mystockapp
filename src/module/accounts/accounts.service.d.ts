import { Model } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';
import { ClientsService } from '../clients/clients.service';
import { PackagesService } from '../packages/packages.service';
import { Account, AccountDocument } from './account.schema';
import { PackageDocument } from '../packages/packages.schema';
export declare class AccountsService {
    private accountModel;
    private readonly companiesService;
    private readonly clientsService;
    private readonly packagesService;
    constructor(accountModel: Model<AccountDocument>, companiesService: CompaniesService, clientsService: ClientsService, packagesService: PackagesService);
    create(createAccountDto: {
        package: string;
        companyId: string;
        clientId: string;
    }): Promise<import("mongoose").Document<unknown, {}, AccountDocument> & Account & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getFinancialSummary(): Promise<{
        totalCompanies: number;
        totalClients: number;
        packages: import("mongoose").Types.ObjectId[];
        summaries: {
            clientId: any;
            package: PackageDocument;
        }[];
    }>;
    findAll(): Promise<AccountDocument[]>;
}
