"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportModule = void 0;
const common_1 = require("@nestjs/common");
const export_service_1 = require("./export.service");
const export_controller_1 = require("./export.controller");
const csv_service_1 = require("./formats/csv.service");
const users_module_1 = require("../users/users.module");
const companies_module_1 = require("../companies/companies.module");
const clients_module_1 = require("../clients/clients.module");
let ExportModule = class ExportModule {
};
exports.ExportModule = ExportModule;
exports.ExportModule = ExportModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, companies_module_1.CompaniesModule, clients_module_1.ClientsModule],
        controllers: [export_controller_1.ExportController],
        providers: [export_service_1.ExportService, csv_service_1.CsvService],
        exports: [export_service_1.ExportService],
    })
], ExportModule);
