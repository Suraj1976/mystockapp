import { SuperSuperAdminService } from './super-super-admin.service';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { CreatePackageDto } from '../packages/dto/create-package.dto';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare class SuperSuperAdminController {
    private readonly superSuperAdminService;
    constructor(superSuperAdminService: SuperSuperAdminService);
    createCompany(req: AuthenticatedRequest, createCompanyDto: CreateCompanyDto & {
        package: CreatePackageDto;
    }): Promise<{
        company: import("../companies/company.schema").CompanyDocument;
        adminId: unknown;
        tempPassword: string;
    }>;
    getAllCompanies(): Promise<import("../companies/company.schema").CompanyDocument[]>;
    getAssociatedCompanies(id: string): Promise<import("mongoose").Types.ObjectId[]>;
    addAssociatedCompany(id: string, body: {
        associatedCompanyId: string;
    }): Promise<import("../companies/company.schema").CompanyDocument>;
    removeAssociatedCompany(id: string, body: {
        associatedCompanyId: string;
    }): Promise<import("../companies/company.schema").CompanyDocument>;
    getCompanyDetailsForForm(id: string): Promise<import("../companies/company.schema").CompanyDocument>;
    getCompanyByLicense(licenseNumber: string): Promise<import("../companies/company.schema").CompanyDocument>;
}
export {};
