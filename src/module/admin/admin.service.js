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
exports.AdminService = void 0;
// src/module/admin/admin.service.ts
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const user_role_enum_1 = require("../../enums/user-role.enum");
const crypto_1 = require("crypto");
let AdminService = class AdminService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createAdmin(email, companyId, role = user_role_enum_1.UserRole.COMPANY_ADMIN) {
        try {
            const existingUser = await this.usersService.findByEmail(email);
            if (existingUser) {
                throw new common_1.BadRequestException(`User with email ${email} already exists`);
            }
            const tempPassword = (0, crypto_1.randomBytes)(6).toString('hex');
            const user = await this.usersService.create({
                email,
                password: tempPassword,
                role,
                companyId, // स्ट्रिंग के रूप में पास करें, UsersService में कन्वर्शन होगा
            });
            return { userId: user._id.toString(), tempPassword };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error creating admin');
        }
    }
    async getAdminDetails(userId) {
        try {
            const user = await this.usersService.findById(userId);
            if (!user || user.role !== user_role_enum_1.UserRole.COMPANY_ADMIN) {
                throw new common_1.NotFoundException('Admin not found');
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error fetching admin details');
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AdminService);
