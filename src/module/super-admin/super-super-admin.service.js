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
exports.SuperSuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const companies_service_1 = require("../companies/companies.service");
const users_service_1 = require("../users/users.service");
const packages_service_1 = require("../packages/packages.service");
const email_service_1 = require("../email/email.service");
const crypto_1 = require("crypto");
const company_schema_1 = require("../companies/company.schema");
const user_role_enum_1 = require("../../enums/user-role.enum");
let SuperSuperAdminService = class SuperSuperAdminService {
    constructor(companiesService, usersService, packagesService, emailService, companyModel) {
        this.companiesService = companiesService;
        this.usersService = usersService;
        this.packagesService = packagesService;
        this.emailService = emailService;
        this.companyModel = companyModel;
    }
    async createCompanyWithAdmin(createCompanyDto, createdBy) {
        try {
            console.log('Creating package:', createCompanyDto.package);
            const pkg = await this.packagesService.create(createCompanyDto.package);
            console.log('Package created:', pkg);
            console.log('Creating company with data:', Object.assign(Object.assign({}, createCompanyDto), { packageId: pkg._id.toString() }));
            const company = await this.companiesService.create(Object.assign(Object.assign({}, createCompanyDto), { packageId: pkg._id.toString() }), createdBy);
            console.log('Company created:', company);
            const tempPassword = (0, crypto_1.randomBytes)(6).toString('hex');
            console.log('Creating admin with email:', createCompanyDto.email);
            const admin = await this.usersService.create({
                email: createCompanyDto.email,
                password: tempPassword,
                role: user_role_enum_1.UserRole.COMPANY_ADMIN,
                companyId: company._id.toString(), // _id को string में कनवर्ट करें
                language: createCompanyDto.language || 'hi',
            });
            console.log('Admin created:', admin);
            const language = createCompanyDto.language || 'hi';
            let emailSubject;
            let emailText;
            let emailHtml;
            if (language === 'hi') {
                emailSubject = 'स्वागत - आपका एडमिन खाता तैयार है';
                emailText = `
          नमस्ते ${createCompanyDto.authorizedPerson},

          आपका एडमिन खाता बन गया है! यहाँ आपके लॉगिन विवरण हैं:

          - **यूज़र ID**: ${admin._id}
          - **पासवर्ड**: ${tempPassword} (कृपया पहली बार लॉगिन पर इसे बदलें)
          - **लॉगिन URL**: http://localhost:3000/auth/login

          इस पासवर्ड से लॉगिन करें और सुरक्षा के लिए इसे बदल दें।

          शुभकामनाएँ,
          सुपर एडमिन टीम
        `;
                emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #4CAF50;">स्वागत है!</h2>
              <p style="font-size: 16px; color: #333;">आपका एडमिन खाता तैयार है, ${createCompanyDto.authorizedPerson}!</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h3 style="color: #333;">आपके लॉगिन विवरण:</h3>
              <p style="font-size: 14px; color: #555;">
                <strong>यूज़र ID:</strong> ${admin._id}<br>
                <strong>पासवर्ड:</strong> ${tempPassword} <span style="color: #e91e63;">(कृपया पहली बार लॉगिन पर इसे बदलें)</span><br>
                <strong>लॉगिन URL:</strong> <a href="http://localhost:3000/auth/login" style="color: #4CAF50; text-decoration: none;">यहाँ क्लिक करें</a>
              </p>
            </div>
            <div style="text-align: center; padding-top: 20px;">
              <p style="font-size: 14px; color: #777;">इस पासवर्ड से लॉगिन करें और सुरक्षा के लिए इसे बदल दें।</p>
              <p style="font-size: 14px; color: #777;">शुभकामनाएँ,<br>सुपर एडमिन टीम</p>
            </div>
          </div>
        `;
            }
            else {
                emailSubject = 'Welcome - Your Admin Account is Ready';
                emailText = `
          Hello ${createCompanyDto.authorizedPerson},

          Your admin account is ready! Here are your login details:

          - **User ID**: ${admin._id}
          - **Password**: ${tempPassword} (Please change it on first login)
          - **Login URL**: http://localhost:3000/auth/login

          Log in with this password and change it for security.

          Best regards,
          Super Admin Team
        `;
                emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #4CAF50;">Welcome!</h2>
              <p style="font-size: 16px; color: #333;">Your admin account is ready, ${createCompanyDto.authorizedPerson}!</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <h3 style="color: #333;">Your Login Details:</h3>
              <p style="font-size: 14px; color: #555;">
                <strong>User ID:</strong> ${admin._id}<br>
                <strong>Password:</strong> ${tempPassword} <span style="color: #e91e63;">(Please change it on first login)</span><br>
                <strong>Login URL:</strong> <a href="http://localhost:3000/auth/login" style="color: #4CAF50; text-decoration: none;">Click Here</a>
              </p>
            </div>
            <div style="text-align: center; padding-top: 20px;">
              <p style="font-size: 14px; color: #777;">Log in with this password and change it for security.</p>
              <p style="font-size: 14px; color: #777;">Best regards,<br>Super Admin Team</p>
            </div>
          </div>
        `;
            }
            try {
                console.log('Sending registration email to:', createCompanyDto.email);
                await this.emailService.sendEmail(createCompanyDto.email, emailSubject, emailText, emailHtml);
                console.log('Registration email sent successfully');
            }
            catch (emailError) {
                console.error('Failed to send registration email:', emailError);
            }
            return { company, adminId: admin._id, tempPassword };
        }
        catch (error) {
            console.error('Error in createCompanyWithAdmin:', error);
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                throw new common_1.BadRequestException(`A company with email ${createCompanyDto.email} already exists`);
            }
            throw new common_1.InternalServerErrorException('Error creating company with admin');
        }
    }
    async getAllCompanies() {
        try {
            return await this.companiesService.findAllWithDetails();
        }
        catch (error) {
            console.error('Error in getAllCompanies:', error);
            throw new common_1.InternalServerErrorException('Error fetching companies');
        }
    }
    async getAssociatedCompanies(companyId) {
        try {
            const company = await this.companiesService.findById(companyId);
            return company.associatedCompanies;
        }
        catch (error) {
            console.error('Error in getAssociatedCompanies:', error);
            throw new common_1.InternalServerErrorException('Error fetching associated companies');
        }
    }
    async addAssociatedCompany(companyId, associatedCompanyId) {
        try {
            return await this.companiesService.addAssociatedCompany(companyId, associatedCompanyId);
        }
        catch (error) {
            console.error('Error in addAssociatedCompany:', error);
            throw new common_1.InternalServerErrorException('Error adding associated company');
        }
    }
    async removeAssociatedCompany(companyId, associatedCompanyId) {
        try {
            return await this.companiesService.removeAssociatedCompany(companyId, associatedCompanyId);
        }
        catch (error) {
            console.error('Error in removeAssociatedCompany:', error);
            throw new common_1.InternalServerErrorException('Error removing associated company');
        }
    }
    async getCompanyDetailsForForm(companyId) {
        try {
            return await this.companiesService.findById(companyId);
        }
        catch (error) {
            console.error('Error in getCompanyDetailsForForm:', error);
            throw new common_1.InternalServerErrorException('Error fetching company details');
        }
    }
    async getCompanyByLicense(licenseNumber) {
        try {
            return await this.companiesService.findByLicenseNumber(licenseNumber);
        }
        catch (error) {
            console.error('Error in getCompanyByLicense:', error);
            throw new common_1.InternalServerErrorException('Error fetching company by license');
        }
    }
};
exports.SuperSuperAdminService = SuperSuperAdminService;
exports.SuperSuperAdminService = SuperSuperAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)(company_schema_1.Company.name)),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService,
        users_service_1.UsersService,
        packages_service_1.PackagesService,
        email_service_1.EmailService,
        mongoose_2.Model])
], SuperSuperAdminService);
