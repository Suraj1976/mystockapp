import { Model } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';
import { PackagesService } from '../packages/packages.service';
import { EmailService } from '../email/email.service';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { CreatePackageDto } from '../packages/dto/create-package.dto';
import { CompanyDocument } from '../companies/company.schema';
export declare class SuperSuperAdminService {
    private readonly companiesService;
    private readonly usersService;
    private readonly packagesService;
    private readonly emailService;
    private companyModel;
    constructor(companiesService: CompaniesService, usersService: UsersService, packagesService: PackagesService, emailService: EmailService, companyModel: Model<CompanyDocument>);
    createCompanyWithAdmin(createCompanyDto: CreateCompanyDto & {
        package: CreatePackageDto;
    }, createdBy: string): Promise<{
        company: CompanyDocument;
        adminId: unknown;
        tempPassword: string;
    }>;
    getAllCompanies(): Promise<CompanyDocument[]>;
    getAssociatedCompanies(companyId: string): Promise<import("mongoose").Types.ObjectId[]>;
    addAssociatedCompany(companyId: string, associatedCompanyId: string): Promise<CompanyDocument>;
    removeAssociatedCompany(companyId: string, associatedCompanyId: string): Promise<CompanyDocument>;
    getCompanyDetailsForForm(companyId: string): Promise<CompanyDocument>;
    getCompanyByLicense(licenseNumber: string): Promise<CompanyDocument>;
}
