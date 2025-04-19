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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("./client.schema");
const companies_service_1 = require("../companies/companies.service");
let ClientsService = class ClientsService {
    constructor(clientModel, companiesService) {
        this.clientModel = clientModel;
        this.companiesService = companiesService;
    }
    async create(createClientDto, createdBy, tenantId) {
        const company = await this.companiesService.findById(createClientDto.companyId);
        if (company.createdBy !== tenantId) {
            throw new common_1.ForbiddenException('You can only create clients for your own company');
        }
        const client = new this.clientModel(Object.assign(Object.assign({}, createClientDto), { createdBy, associatedCompanyIds: company.associatedCompanies || [] }));
        return client.save();
    }
    async findById(id) {
        const client = await this.clientModel.findById(id).exec();
        if (!client) {
            throw new common_1.ForbiddenException('Client not found');
        }
        return client;
    }
    async findByCreator(userId) {
        return this.clientModel.find({ createdBy: userId }).populate('companyId').populate('associatedCompanyIds').exec();
    }
    async findAll() {
        return this.clientModel.find().populate('companyId').populate('associatedCompanyIds').exec();
    }
    async findAllByTenantId(tenantId) {
        return this.clientModel.find({ companyId: tenantId }).populate('companyId').populate('associatedCompanyIds').exec();
    }
    async update(id, userId, updateData) {
        const client = await this.clientModel.findById(id).exec();
        if (client.createdBy !== userId)
            throw new common_1.ForbiddenException('You can only edit your own clients');
        return this.clientModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async delete(id, userId) {
        const client = await this.clientModel.findById(id).exec();
        if (client.createdBy !== userId)
            throw new common_1.ForbiddenException('You can only delete your own clients');
        return this.clientModel.findByIdAndDelete(id).exec();
    }
    async selfRenew(userId, renewClientDto) {
        const client = await this.clientModel.findOne({ createdBy: userId }).exec();
        if (!client)
            throw new common_1.ForbiddenException('Client not found');
        return this.clientModel.findByIdAndUpdate(client._id, { expiryDate: new Date(renewClientDto.expiryDate) }, { new: true }).exec();
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        companies_service_1.CompaniesService])
], ClientsService);
