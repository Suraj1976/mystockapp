import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

  async create(createCompanyDto: CreateCompanyDto, createdBy: string): Promise<CompanyDocument> {
    // डुप्लिकेट ईमेल की जाँच करें
    const existingCompany = await this.companyModel.findOne({ email: createCompanyDto.email }).exec();
    if (existingCompany) {
      throw new BadRequestException(`A company with email ${createCompanyDto.email} already exists`);
    }

    const company = new this.companyModel({
      ...createCompanyDto,
      createdBy,
      licenseNumber: uuidv4(),
      associatedCompanies: [],
    });
    return company.save();
  }

  async findById(id: string): Promise<CompanyDocument> {
    return this.companyModel.findById(id).populate('packageId').exec();
  }

  async findAllWithDetails(): Promise<CompanyDocument[]> {
    return this.companyModel.find().populate('packageId').exec();
  }

  async findByLicenseNumber(licenseNumber: string): Promise<CompanyDocument> {
    return this.companyModel.findOne({ licenseNumber }).populate('packageId').exec();
  }

  async addAssociatedCompany(companyId: string, associatedCompanyId: string): Promise<CompanyDocument> {
    return this.companyModel.findByIdAndUpdate(
      companyId,
      { $addToSet: { associatedCompanies: new Types.ObjectId(associatedCompanyId) } },
      { new: true },
    ).exec();
  }

  async removeAssociatedCompany(companyId: string, associatedCompanyId: string): Promise<CompanyDocument> {
    return this.companyModel.findByIdAndUpdate(
      companyId,
      { $pull: { associatedCompanies: new Types.ObjectId(associatedCompanyId) } },
      { new: true },
    ).exec();
  }
}