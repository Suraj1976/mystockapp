"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST') || 'smtp.example.com',
            port: this.configService.get('SMTP_PORT') || 587,
            secure: this.configService.get('SMTP_USE_SSL') || false, // Port 587 के लिए false
            auth: {
                user: this.configService.get('SENDER_EMAIL') || 'default@example.com',
                pass: this.configService.get('SENDER_PASSWORD') || 'defaultpassword',
            },
        });
        // ट्रांसपोर्टर को सत्यापित करें (async/await का उपयोग करें)
        this.verifyTransporter();
    }
    async verifyTransporter() {
        try {
            await this.transporter.verify();
            console.log('SMTP server is ready to send emails');
        }
        catch (error) {
            console.error('SMTP configuration error:', error instanceof Error ? error.message : 'Unknown error');
        }
    }
    async sendEmail(to, subject, text, html) {
        try {
            const mailOptions = {
                from: this.configService.get('SENDER_EMAIL') || 'default@example.com',
                to,
                subject,
                text,
                html,
            };
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            return info;
        }
        catch (error) {
            console.error('Error sending email:', error instanceof Error ? error.message : 'Unknown error');
            throw new common_1.InternalServerErrorException('Error sending email');
        }
    }
    async sendCompanyAdminCredentials(to, tempPassword, language) {
        const subject = language === 'hi' ? 'स्वागत - आपका एडमिन खाता तैयार है' : 'Welcome - Your Admin Account is Ready';
        const text = language === 'hi'
            ? `नमस्ते,\n\nआपका अस्थायी पासवर्ड है: ${tempPassword}\nलॉगिन करें: http://localhost:3000/auth/login\n`
            : `Hello,\n\nYour temporary password is: ${tempPassword}\nLogin at: http://localhost:3000/auth/login\n`;
        const html = language === 'hi'
            ? `<p>नमस्ते,</p><p>आपका अस्थायी पासवर्ड है: <strong>${tempPassword}</strong></p><p><a href="http://localhost:3000/auth/login">लॉगिन करें</a></p>`
            : `<p>Hello,</p><p>Your temporary password is: <strong>${tempPassword}</strong></p><p><a href="http://localhost:3000/auth/login">Login</a></p>`;
        return await this.sendEmail(to, subject, text, html);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
