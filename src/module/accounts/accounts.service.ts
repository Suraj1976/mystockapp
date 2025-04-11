import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async create(createAccountDto: { package: string; companyId: string; clientId: string }) {
    const pkg: PackageDocument = await this.packagesService.findById(createAccountDto.package);
    if (!pkg) {
      throw new Error('Package not found');
    }
    const company = await this.companiesService.findById(createAccountDto.companyId);
    if (!company) {
      throw new Error('Company not found');
    }
    const client = await this.clientsService.findById(createAccountDto.clientId);
    if (!client) {
      throw new Error('Client not found');
    }
    const account = new this.accountModel({
      packageId: pkg._id,
      companyId: company._id,
      clientId: client._id,
      createdAt: new Date(),
    });
    return account.save();
  }

  async getFinancialSummary() {
    const companies = await this.companiesService.findAllWithDetails();
    const clients = await this.clientsService.findAll();
    const accounts = await this.findAll();
    const summaries = await Promise.all(
      accounts.map(async (account: any) => {
        const pkg = await this.packagesService.findById(account.packageId.toString());
        return {
          clientId: account.clientId,
          package: pkg,
        };
      })
    );
    return {
      totalCompanies: companies.length,
      totalClients: clients.length,
      packages: companies.map(c => c.packageId),
      summaries,
    };
  }

  async findAll(): Promise<AccountDocument[]> {
    return this.accountModel.find().populate('packageId').populate('companyId').populate('clientId').exec();
  }
}