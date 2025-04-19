"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const csv_service_1 = require("./formats/csv.service");
const users_service_1 = require("../users/users.service");
const companies_service_1 = require("../companies/companies.service");
const clients_service_1 = require("../clients/clients.service");
let ExportService = class ExportService {
    constructor(csvService, usersService, companiesService, clientsService) {
        this.csvService = csvService;
        this.usersService = usersService;
        this.companiesService = companiesService;
        this.clientsService = clientsService;
    }
    async exportUsers(tenantId) {
        const users = await this.usersService.findAll(tenantId);
        return this.csvService.generateCsv(users, 'users');
    }
    async exportCompanies(tenantId) {
        const companies = await this.companiesService.findAllWithDetails(); // findAll की जगह findAllWithDetails
        return this.csvService.generateCsv(companies, 'companies');
    }
    async exportClients(tenantId) {
        const clients = await this.clientsService.findAllByTenantId(tenantId);
        return this.csvService.generateCsv(clients, 'clients');
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [csv_service_1.CsvService,
        users_service_1.UsersService,
        companies_service_1.CompaniesService,
        clients_service_1.ClientsService])
], ExportService);
