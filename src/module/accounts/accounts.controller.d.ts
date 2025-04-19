import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    create(createAccountDto: any): Promise<import("mongoose").Document<unknown, {}, import("./account.schema").AccountDocument> & import("./account.schema").Account & import("mongoose").Document<unknown, any, any> & Required<{
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
            package: import("../packages/packages.schema").PackageDocument;
        }[];
    }>;
}
