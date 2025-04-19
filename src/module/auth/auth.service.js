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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const email_service_1 = require("../email/email.service");
const user_role_enum_1 = require("../../enums/user-role.enum");
let AuthService = class AuthService {
    constructor(usersService, jwtService, emailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async registerSuperAdmin(email, password) {
        try {
            console.log('Checking if user exists with email:', email);
            const existingUser = await this.usersService.findByEmail(email);
            console.log('Existing user:', existingUser);
            if (existingUser) {
                throw new common_1.UnauthorizedException('User already exists');
            }
            console.log('Creating new super admin with email:', email);
            const user = await this.usersService.create({
                email,
                password,
                role: user_role_enum_1.UserRole.SUPER_SUPER_ADMIN,
            });
            console.log('Super admin created:', user);
            return { message: 'Super admin registered successfully', userId: user._id.toString() };
        }
        catch (error) {
            console.error('Error in registerSuperAdmin:', error);
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error registering super admin');
        }
    }
    async validateUser(email, pass) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (!user.password) {
                throw new common_1.InternalServerErrorException('User password not set');
            }
            if (await bcrypt.compare(pass, user.password)) {
                const _a = user.toObject(), { password } = _a, result = __rest(_a, ["password"]);
                return result;
            }
            return null;
        }
        catch (error) {
            console.error('Error in validateUser:', error);
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error validating user');
        }
    }
    async login(loginDto) {
        try {
            console.log('Attempting login for email:', loginDto.email);
            const user = await this.usersService.findByEmail(loginDto.email);
            console.log('User found:', user);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (!user.password) {
                throw new common_1.InternalServerErrorException('User password not set');
            }
            console.log('Comparing passwords...');
            const isMatch = await bcrypt.compare(loginDto.password, user.password);
            console.log('Password match:', isMatch);
            if (!isMatch) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            console.log('Password matched, generating token...');
            const payload = { email: user.email, sub: user._id.toString(), role: user.role, isFirstLogin: user.isFirstLogin };
            const accessToken = this.jwtService.sign(payload);
            if (user.isFirstLogin) {
                const language = user.language || 'hi';
                let welcomeSubject;
                let welcomeText;
                let welcomeHtml;
                if (language === 'hi') {
                    welcomeSubject = 'पहली बार लॉगिन का स्वागत';
                    welcomeText = `
            नमस्ते ${user.email},

            स्वागत है! आप पहली बार लॉगिन किए हैं:

            - **यूज़र ID**: ${user._id}
            - अभी अपना पासवर्ड बदलें ताकि सुरक्षित शुरुआत हो सके।

            मज़े करें,
            सुपर एडमिन टीम
          `;
                    welcomeHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
              <div style="text-align: center; padding-bottom: 20px;">
                <h2 style="color: #4CAF50;">पहली बार लॉगिन का स्वागत!</h2>
                <p style="font-size: 16px; color: #333;">नमस्ते ${user.email},</p>
              </div>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h3 style="color: #333;">आपके लॉगिन विवरण:</h3>
                <p style="font-size: 14px; color: #555;">
                  <strong>यूज़र ID:</strong> ${user._id}<br>
                  अभी अपना पासवर्ड बदलें ताकि सुरक्षित शुरुआत हो सके।
                </p>
              </div>
              <div style="text-align: center; padding-top: 20px;">
                <p style="font-size: 14px; color: #777;">मज़े करें,<br>सुपर एडमिन टीम</p>
              </div>
            </div>
          `;
                }
                else {
                    welcomeSubject = 'First Login Welcome';
                    welcomeText = `
            Hello ${user.email},

            Welcome aboard! You've logged in for the first time:

            - **User ID**: ${user._id}
            - Change your password now to get started securely.

            Have fun,
            Super Admin Team
          `;
                    welcomeHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
              <div style="text-align: center; padding-bottom: 20px;">
                <h2 style="color: #4CAF50;">First Login Welcome!</h2>
                <p style="font-size: 16px; color: #333;">Hello ${user.email},</p>
              </div>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <h3 style="color: #333;">Your Login Details:</h3>
                <p style="font-size: 14px; color: #555;">
                  <strong>User ID:</strong> ${user._id}<br>
                  Change your password now to get started securely.
                </p>
              </div>
              <div style="text-align: center; padding-top: 20px;">
                <p style="font-size: 14px; color: #777;">Have fun,<br>Super Admin Team</p>
              </div>
            </div>
          `;
                }
                try {
                    await this.emailService.sendEmail(user.email, welcomeSubject, welcomeText, welcomeHtml);
                }
                catch (emailError) {
                    console.error('Failed to send welcome email:', emailError instanceof Error ? emailError.message : 'Unknown error');
                }
            }
            return { access_token: accessToken, isFirstLogin: user.isFirstLogin };
        }
        catch (error) {
            console.error('Error in login:', error);
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error during login');
        }
    }
    async changePassword(email, oldPassword, newPassword) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (!user.password) {
                throw new common_1.InternalServerErrorException('User password not set');
            }
            if (!(await bcrypt.compare(oldPassword, user.password))) {
                throw new common_1.UnauthorizedException('Invalid old password');
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(newPassword, salt);
            const updatedUser = await this.usersService.update(user._id.toString(), { password: hash, isFirstLogin: false });
            const superAdminEmail = 'superadmin@example.com';
            const notificationSubject = 'Admin Ne Password Change Kiya';
            const notificationText = `
        Super Admin Bhai,

        ${email} (User ID: ${user._id}) ne apna password update kar diya hai.

        Regards,
        System
      `;
            const notificationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #4CAF50;">Password Update Notification</h2>
            <p style="font-size: 16px; color: #333;">Super Admin Bhai,</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <p style="font-size: 14px; color: #555;">
              ${email} (User ID: ${user._id}) ने अपना पासवर्ड अपडेट कर दिया है।
            </p>
          </div>
          <div style="text-align: center; padding-top: 20px;">
            <p style="font-size: 14px; color: #777;">Regards,<br>System</p>
          </div>
        </div>
      `;
            try {
                await this.emailService.sendEmail(superAdminEmail, notificationSubject, notificationText, notificationHtml);
            }
            catch (emailError) {
                console.error('Failed to send notification email:', emailError instanceof Error ? emailError.message : 'Unknown error');
            }
            return { message: 'Password changed successfully' };
        }
        catch (error) {
            console.error('Error in changePassword:', error);
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error changing password');
        }
    }
    async requestOtp(email) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            // Generate OTP and expiration time
            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
            // Save OTP and expiration to user
            await this.usersService.requestOtp(email, otp, otpExpires);
            // Send OTP via email
            const language = user.language || 'hi';
            let subject;
            let text;
            let html;
            if (language === 'hi') {
                subject = 'आपका OTP रीसेट पासवर्ड के लिए';
                text = `
          नमस्ते ${email},

          आपका OTP पासवर्ड रीसेट करने के लिए: ${otp}
          यह OTP 10 मिनट तक वैध है।

          धन्यवाद,
          सुपर एडमिन टीम
        `;
                html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #4CAF50;">आपका OTP रीसेट पासवर्ड के लिए</h2>
              <p style="font-size: 16px; color: #333;">नमस्ते ${email},</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <p style="font-size: 14px; color: #555;">
                आपका OTP पासवर्ड रीसेट करने के लिए: <strong>${otp}</strong><br>
                यह OTP 10 मिनट तक वैध है।
              </p>
            </div>
            <div style="text-align: center; padding-top: 20px;">
              <p style="font-size: 14px; color: #777;">धन्यवाद,<br>सुपर एडमिन टीम</p>
            </div>
          </div>
        `;
            }
            else {
                subject = 'Your OTP for Password Reset';
                text = `
          Hello ${email},

          Your OTP for password reset: ${otp}
          This OTP is valid for 10 minutes.

          Thank you,
          Super Admin Team
        `;
                html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #4CAF50;">Your OTP for Password Reset</h2>
              <p style="font-size: 16px; color: #333;">Hello ${email},</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
              <p style="font-size: 14px; color: #555;">
                Your OTP for password reset: <strong>${otp}</strong><br>
                This OTP is valid for 10 minutes.
              </p>
            </div>
            <div style="text-align: center; padding-top: 20px;">
              <p style="font-size: 14px; color: #777;">Thank you,<br>Super Admin Team</p>
            </div>
          </div>
        `;
            }
            await this.emailService.sendEmail(email, subject, text, html);
            return { message: 'OTP sent successfully to your email' };
        }
        catch (error) {
            console.error('Error in requestOtp:', error);
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error sending OTP');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
