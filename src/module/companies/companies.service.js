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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const company_schema_1 = require("./company.schema");
const uuid_1 = require("uuid");
let CompaniesService = class CompaniesService {
    constructor(companyModel) {
        this.companyModel = companyModel;
    }
    async create(createCompanyDto, createdBy) {
        // डुप्लिकेट ईमेल की जाँच करें
        const existingCompany = await this.companyModel.findOne({ email: createCompanyDto.email }).exec();
        if (existingCompany) {
            throw new common_1.BadRequestException(`A company with email ${createCompanyDto.email} already exists`);
        }
        const company = new this.companyModel(Object.assign(Object.assign({}, createCompanyDto), { createdBy, licenseNumber: (0, uuid_1.v4)(), associatedCompanies: [] }));
        return company.save();
    }
    async findById(id) {
        return this.companyModel.findById(id).populate('packageId').exec();
    }
    async findAllWithDetails() {
        return this.companyModel.find().populate('packageId').exec();
    }
    async findByLicenseNumber(licenseNumber) {
        return this.companyModel.findOne({ licenseNumber }).populate('packageId').exec();
    }
    async addAssociatedCompany(companyId, associatedCompanyId) {
        return this.companyModel.findByIdAndUpdate(companyId, { $addToSet: { associatedCompanies: new mongoose_2.Types.ObjectId(associatedCompanyId) } }, { new: true }).exec();
    }
    async removeAssociatedCompany(companyId, associatedCompanyId) {
        return this.companyModel.findByIdAndUpdate(companyId, { $pull: { associatedCompanies: new mongoose_2.Types.ObjectId(associatedCompanyId) } }, { new: true }).exec();
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CompaniesService);
