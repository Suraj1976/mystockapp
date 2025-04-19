import { Model } from 'mongoose';
import { CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
export declare class CompaniesService {
    private companyModel;
    constructor(companyModel: Model<CompanyDocument>);
    create(createCompanyDto: CreateCompanyDto, createdBy: string): Promise<CompanyDocument>;
    findById(id: string): Promise<CompanyDocument>;
    findAllWithDetails(): Promise<CompanyDocument[]>;
    findByLicenseNumber(licenseNumber: string): Promise<CompanyDocument>;
    addAssociatedCompany(companyId: string, associatedCompanyId: string): Promise<CompanyDocument>;
    removeAssociatedCompany(companyId: string, associatedCompanyId: string): Promise<CompanyDocument>;
}
