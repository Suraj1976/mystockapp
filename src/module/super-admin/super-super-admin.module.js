"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperSuperAdminModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const super_super_admin_service_1 = require("./super-super-admin.service");
const super_super_admin_controller_1 = require("./super-super-admin.controller");
const companies_module_1 = require("../companies/companies.module");
const users_module_1 = require("../users/users.module");
const packages_module_1 = require("../packages/packages.module");
const email_module_1 = require("../email/email.module");
const company_schema_1 = require("../companies/company.schema");
let SuperSuperAdminModule = class SuperSuperAdminModule {
};
exports.SuperSuperAdminModule = SuperSuperAdminModule;
exports.SuperSuperAdminModule = SuperSuperAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: company_schema_1.Company.name, schema: company_schema_1.CompanySchema }]), // CompanyModel को रजिस्टर करें
            companies_module_1.CompaniesModule,
            users_module_1.UsersModule,
            packages_module_1.PackagesModule,
            email_module_1.EmailModule,
        ],
        controllers: [super_super_admin_controller_1.SuperSuperAdminController],
        providers: [super_super_admin_service_1.SuperSuperAdminService],
    })
], SuperSuperAdminModule);
