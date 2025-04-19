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
exports.QuotationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quotation_schema_1 = require("./quotation.schema");
const user_role_enum_1 = require("../../enums/user-role.enum");
let QuotationsService = class QuotationsService {
    constructor(quotationModel) {
        this.quotationModel = quotationModel;
    }
    async create(createQuotationDto, user) {
        try {
            const quotation = new this.quotationModel(Object.assign(Object.assign({}, createQuotationDto), { createdBy: user.userId }));
            return await quotation.save();
        }
        catch (error) {
            console.error('Error in create:', error);
            throw new common_1.InternalServerErrorException('Error creating quotation');
        }
    }
    async findAll() {
        try {
            return this.quotationModel.find().exec();
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.InternalServerErrorException('Error fetching quotations');
        }
    }
    async findOne(id) {
        try {
            const quotation = await this.quotationModel.findById(id).exec();
            if (!quotation) {
                throw new common_1.NotFoundException(`Quotation with ID ${id} not found`);
            }
            return quotation;
        }
        catch (error) {
            console.error('Error in findOne:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Error fetching quotation');
        }
    }
    async update(id, updateQuotationDto, user) {
        try {
            const quotation = await this.findOne(id);
            if (quotation.createdBy.toString() !== user.userId && user.role !== user_role_enum_1.UserRole.COMPANY_ADMIN) {
                throw new common_1.ForbiddenException('You can only update your own quotations');
            }
            return this.quotationModel.findByIdAndUpdate(id, updateQuotationDto, { new: true }).exec();
        }
        catch (error) {
            console.error('Error in update:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Error updating quotation');
        }
    }
    async remove(id, user) {
        try {
            const quotation = await this.findOne(id);
            if (quotation.createdBy.toString() !== user.userId && user.role !== user_role_enum_1.UserRole.COMPANY_ADMIN) {
                throw new common_1.ForbiddenException('You can only delete your own quotations');
            }
            await this.quotationModel.findByIdAndDelete(id).exec();
        }
        catch (error) {
            console.error('Error in remove:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.ForbiddenException)
                throw error;
            throw new common_1.InternalServerErrorException('Error deleting quotation');
        }
    }
};
exports.QuotationsService = QuotationsService;
exports.QuotationsService = QuotationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quotation_schema_1.Quotation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuotationsService);
