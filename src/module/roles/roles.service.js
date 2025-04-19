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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_schema_1 = require("./role.schema"); // सही पथ
let RolesService = class RolesService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async findAll(user) {
        try {
            return this.roleModel.find().exec();
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.InternalServerErrorException('Error fetching roles');
        }
    }
    async create(createRoleDto, user) {
        try {
            const role = new this.roleModel(Object.assign(Object.assign({}, createRoleDto), { createdBy: user._id }));
            return role.save();
        }
        catch (error) {
            console.error('Error in create:', error);
            throw new common_1.InternalServerErrorException('Error creating role');
        }
    }
    async updatePermissions(role, updatePermissionsDto) {
        try {
            const roleDoc = await this.roleModel.findOne({ name: role }).exec(); // 'role' को 'name' से मेल खाने के लिए
            if (!roleDoc) {
                const newRole = new this.roleModel({ name: role, permissions: updatePermissionsDto.permissions });
                return newRole.save();
            }
            roleDoc.permissions = updatePermissionsDto.permissions;
            return roleDoc.save();
        }
        catch (error) {
            console.error('Error in updatePermissions:', error);
            throw new common_1.InternalServerErrorException('Error updating permissions');
        }
    }
    async findOne(id) {
        try {
            const role = await this.roleModel.findById(id).exec();
            if (!role) {
                throw new common_1.NotFoundException(`Role with ID ${id} not found`);
            }
            return role;
        }
        catch (error) {
            console.error('Error in findOne:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Error fetching role');
        }
    }
    async update(id, updateRoleDto) {
        try {
            const role = await this.findOne(id);
            return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
        }
        catch (error) {
            console.error('Error in update:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Error updating role');
        }
    }
    async remove(id) {
        try {
            const role = await this.findOne(id);
            await this.roleModel.findByIdAndDelete(id).exec();
        }
        catch (error) {
            console.error('Error in remove:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Error deleting role');
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RolesService);
