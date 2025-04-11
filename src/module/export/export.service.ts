import { Injectable } from '@nestjs/common';
import { CsvService } from './formats/csv.service';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class ExportService {
  constructor(
    private csvService: CsvService,
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private clientsService: ClientsService,
  ) {}

  async exportUsers(tenantId: string) {
    const users = await this.usersService.findAll(tenantId);
    return this.csvService.generateCsv(users, 'users');
  }

  async exportCompanies(tenantId: string) {
    const companies = await this.companiesService.findAllWithDetails(); // findAll की जगह findAllWithDetails
    return this.csvService.generateCsv(companies, 'companies');
  }

  async exportClients(tenantId: string) {
    const clients = await this.clientsService.findAllByTenantId(tenantId);
    return this.csvService.generateCsv(clients, 'clients');
  }
}