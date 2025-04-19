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
exports.SuperSuperAdminController = void 0;
const common_1 = require("@nestjs/common");
const super_super_admin_service_1 = require("./super-super-admin.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let SuperSuperAdminController = class SuperSuperAdminController {
    constructor(superSuperAdminService) {
        this.superSuperAdminService = superSuperAdminService;
    }
    createCompany(req, createCompanyDto) {
        return this.superSuperAdminService.createCompanyWithAdmin(createCompanyDto, req.user.userId);
    }
    getAllCompanies() {
        return this.superSuperAdminService.getAllCompanies();
    }
    getAssociatedCompanies(id) {
        return this.superSuperAdminService.getAssociatedCompanies(id);
    }
    addAssociatedCompany(id, body) {
        return this.superSuperAdminService.addAssociatedCompany(id, body.associatedCompanyId);
    }
    removeAssociatedCompany(id, body) {
        return this.superSuperAdminService.removeAssociatedCompany(id, body.associatedCompanyId);
    }
    getCompanyDetailsForForm(id) {
        return this.superSuperAdminService.getCompanyDetailsForForm(id);
    }
    getCompanyByLicense(licenseNumber) {
        return this.superSuperAdminService.getCompanyByLicense(licenseNumber);
    }
};
exports.SuperSuperAdminController = SuperSuperAdminController;
__decorate([
    (0, common_1.Post)('create-company'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Get)('all-companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "getAllCompanies", null);
__decorate([
    (0, common_1.Get)('company/:id/associated'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "getAssociatedCompanies", null);
__decorate([
    (0, common_1.Post)('company/:id/add-associated'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "addAssociatedCompany", null);
__decorate([
    (0, common_1.Post)('company/:id/remove-associated'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "removeAssociatedCompany", null);
__decorate([
    (0, common_1.Get)('company/:id/form-details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "getCompanyDetailsForForm", null);
__decorate([
    (0, common_1.Get)('company/license/:licenseNumber'),
    __param(0, (0, common_1.Param)('licenseNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuperSuperAdminController.prototype, "getCompanyByLicense", null);
exports.SuperSuperAdminController = SuperSuperAdminController = __decorate([
    (0, common_1.Controller)('super-super-admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_SUPER_ADMIN'),
    __metadata("design:paramtypes", [super_super_admin_service_1.SuperSuperAdminService])
], SuperSuperAdminController);
