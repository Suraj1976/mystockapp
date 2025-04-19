import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CompaniesService } from '../companies/companies.service';
import { ClientsService } from '../clients/clients.service';
import { PackagesService } from '../packages/packages.service';
import { Account, AccountDocument } from './account.schema';
import { PackageDocument } from '../packages/packages.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private readonly companiesService: CompaniesService,
    private readonly clientsService: ClientsService,
    private readonly packagesService: PackagesService,
  ) {}

  async create(createAccountDto: { package: string; companyId: string; clientId: string }): Promise<AccountDocument> {
    try {
      // Validate package
      const pkg: PackageDocument = await this.packagesService.findById(createAccountDto.package);
      if (!pkg) {
        throw new NotFoundException(`Package with ID ${createAccountDto.package} not found`);
      }

      // Validate company
      const company = await this.companiesService.findById(createAccountDto.companyId);
      if (!company) {
        throw new NotFoundException(`Company with ID ${createAccountDto.companyId} not found`);
      }

      // Validate client
      const client = await this.clientsService.findById(createAccountDto.clientId);
      if (!client) {
        throw new NotFoundException(`Client with ID ${createAccountDto.clientId} not found`);
      }

      // Create account
      const account = new this.accountModel({
        packageId: pkg._id,
        companyId: company._id,
        clientId: client._id,
        createdAt: new Date(),
      });
      const savedAccount = await account.save();
      console.log(`Account created with ID: ${savedAccount._id}`);
      return savedAccount;
    } catch (error: unknown) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async getFinancialSummary(): Promise<{
    totalCompanies: number;
    totalClients: number;
    packages: Types.ObjectId[];
    summaries: { clientId: Types.ObjectId; package: PackageDocument }[];
  }> {
    try {
      const companies = await this.companiesService.findAllWithDetails();
      const clients = await this.clientsService.findAll();
      const accounts = await this.findAll();

      const summaries = await Promise.all(
        accounts.map(async (account: AccountDocument) => {
          const pkg = await this.packagesService.findById(account.packageId.toString());
          if (!pkg) {
            throw new NotFoundException(`Package with ID ${account.packageId} not found`);
          }
          return {
            clientId: account.clientId,
            package: pkg,
          };
        }),
      );

      const totalCompanies = new Set(companies.map(company => company._id.toString())).size;
      const totalClients = new Set(clients.map(client => client._id.toString())).size;
      const packages = [...new Set(accounts.map(account => account.packageId))];

      return {
        totalCompanies,
        totalClients,
        packages,
        summaries,
      };
    } catch (error: unknown) {
      console.error('Error fetching financial summary:', error);
      throw error;
    }
  }

  async findAll(): Promise<AccountDocument[]> {
    try {
      return await this.accountModel
        .find()
        .populate('packageId')
        .populate('companyId')
        .populate('clientId')
        .exec();
    } catch (error: unknown) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }
}