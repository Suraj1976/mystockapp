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
exports.ManagerController = void 0;
// src/module/manager/manager.controller.ts
const common_1 = require("@nestjs/common");
const manager_service_1 = require("./manager.service");
const create_manager_dto_1 = require("./dto/create-manager.dto");
const update_manager_dto_1 = require("./dto//update-manager.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../enums/user-role.enum");
let ManagerController = class ManagerController {
    constructor(managerService) {
        this.managerService = managerService;
    }
    create(createManagerDto) {
        return this.managerService.create(createManagerDto);
    }
    findAll() {
        return this.managerService.findAll();
    }
    findOne(id) {
        return this.managerService.findOne(id);
    }
    update(id, updateManagerDto) {
        return this.managerService.update(id, updateManagerDto);
    }
    remove(id) {
        return this.managerService.remove(id);
    }
    getDashboardData(req) {
        return this.managerService.getDashboardData(req.user.companyId);
    }
};
exports.ManagerController = ManagerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manager_dto_1.CreateManagerDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manager_dto_1.UpdateManagerDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "getDashboardData", null);
exports.ManagerController = ManagerController = __decorate([
    (0, common_1.Controller)('manager'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.COMPANY_ADMIN) // केवल COMPANY_ADMIN मैनेजर बना सकता है
    ,
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
