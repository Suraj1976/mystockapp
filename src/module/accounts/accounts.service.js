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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const companies_service_1 = require("../companies/companies.service");
const clients_service_1 = require("../clients/clients.service");
const packages_service_1 = require("../packages/packages.service");
const account_schema_1 = require("./account.schema");
let AccountsService = class AccountsService {
    constructor(accountModel, companiesService, clientsService, packagesService) {
        this.accountModel = accountModel;
        this.companiesService = companiesService;
        this.clientsService = clientsService;
        this.packagesService = packagesService;
    }
    async create(createAccountDto) {
        const pkg = await this.packagesService.findById(createAccountDto.package);
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
        const summaries = await Promise.all(accounts.map(async (account) => {
            const pkg = await this.packagesService.findById(account.packageId.toString());
            return {
                clientId: account.clientId,
                package: pkg,
            };
        }));
        return {
            totalCompanies: companies.length,
            totalClients: clients.length,
            packages: companies.map(c => c.packageId),
            summaries,
        };
    }
    async findAll() {
        return this.accountModel.find().populate('packageId').populate('companyId').populate('clientId').exec();
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_schema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        companies_service_1.CompaniesService,
        clients_service_1.ClientsService,
        packages_service_1.PackagesService])
], AccountsService);
