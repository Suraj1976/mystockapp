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
exports.ManagerService = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients/clients.service");
const users_service_1 = require("../users/users.service");
const user_role_enum_1 = require("../../enums/user-role.enum");
const mongoose_1 = require("mongoose");
let ManagerService = class ManagerService {
    constructor(clientsService, usersService) {
        this.clientsService = clientsService;
        this.usersService = usersService;
    }
    async create(createManagerDto) {
        try {
            const manager = await this.usersService.create(Object.assign(Object.assign({}, createManagerDto), { role: user_role_enum_1.UserRole.MANAGER }));
            console.log('Manager created:', manager._id);
            return manager;
        }
        catch (error) {
            console.error('Error creating manager:', error);
            throw error;
        }
    }
    async findAll() {
        try {
            const managers = await this.usersService.findAll('');
            return managers.filter(user => user.role === user_role_enum_1.UserRole.MANAGER);
        }
        catch (error) {
            console.error('Error finding managers:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const user = await this.usersService.findById(id);
            if (!user || user.role !== user_role_enum_1.UserRole.MANAGER) {
                throw new common_1.ForbiddenException('Manager not found');
            }
            return user;
        }
        catch (error) {
            console.error('Error finding manager:', error);
            throw error;
        }
    }
    async update(id, updateManagerDto) {
        try {
            // Convert companyId to ObjectId if present
            const updateData = Object.assign({}, updateManagerDto);
            if (updateManagerDto.companyId && typeof updateManagerDto.companyId === 'string') {
                updateData.companyId = new mongoose_1.Types.ObjectId(updateManagerDto.companyId);
            }
            const updatedManager = await this.usersService.update(id, updateData);
            console.log('Manager updated:', updatedManager._id);
            return updatedManager;
        }
        catch (error) {
            console.error('Error updating manager:', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.findOne(id); // Check if manager exists and has correct role
            await this.usersService.delete(id);
            console.log('Manager removed:', id);
        }
        catch (error) {
            console.error('Error removing manager:', error);
            throw error;
        }
    }
    async getDashboardData(companyId) {
        try {
            const clients = await this.clientsService.findAllByTenantId(companyId);
            const users = await this.usersService.findAll(companyId);
            return {
                totalClients: clients.length,
                totalUsers: users.length,
            };
        }
        catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }
};
exports.ManagerService = ManagerService;
exports.ManagerService = ManagerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        users_service_1.UsersService])
], ManagerService);
