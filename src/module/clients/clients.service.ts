import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './client.schema';
import { CompaniesService } from '../companies/companies.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly companiesService: CompaniesService,
  ) {}

  async create(createClientDto: CreateClientDto, createdBy: string, tenantId: string): Promise<Client> {
    const company = await this.companiesService.findById(createClientDto.companyId);
    if (company.createdBy !== tenantId) {
      throw new ForbiddenException('You can only create clients for your own company');
    }
    const client = new this.clientModel({
      ...createClientDto,
      createdBy,
      associatedCompanyIds: company.associatedCompanies || [],
    });
    return client.save();
  }

  async findById(id: string): Promise<ClientDocument> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new ForbiddenException('Client not found');
    }
    return client;
  }

  async findByCreator(userId: string): Promise<ClientDocument[]> {
    return this.clientModel.find({ createdBy: userId }).populate('companyId').populate('associatedCompanyIds').exec();
  }

  async findAll(): Promise<ClientDocument[]> {
    return this.clientModel.find().populate('companyId').populate('associatedCompanyIds').exec();
  }

  async findAllByTenantId(tenantId: string): Promise<ClientDocument[]> {
    return this.clientModel.find({ companyId: tenantId }).populate('companyId').populate('associatedCompanyIds').exec();
  }

  async update(id: string, userId: string, updateData: any): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (client.createdBy !== userId) throw new ForbiddenException('You can only edit your own clients');
    return this.clientModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string, userId: string): Promise<any> {
    const client = await this.clientModel.findById(id).exec();
    if (client.createdBy !== userId) throw new ForbiddenException('You can only delete your own clients');
    return this.clientModel.findByIdAndDelete(id).exec();
  }

  async selfRenew(userId: string, renewClientDto: { expiryDate: string }): Promise<Client> {
    const client = await this.clientModel.findOne({ createdBy: userId }).exec();
    if (!client) throw new ForbiddenException('Client not found');
    return this.clientModel.findByIdAndUpdate(
      client._id,
      { expiryDate: new Date(renewClientDto.expiryDate) },
      { new: true }
    ).exec();
  }
}