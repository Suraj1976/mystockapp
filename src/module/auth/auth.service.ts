import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async registerSuperAdmin(email: string, password: string) {
    try {
      console.log('Checking if user exists with email:', email);
      const existingUser = await this.usersService.findByEmail(email);
      console.log('Existing user:', existingUser);

      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }

      console.log('Creating new super admin with email:', email);
      const user = await this.usersService.create({
        email,
        password,
        role: 'SUPER_SUPER_ADMIN',
      });
      console.log('Super admin created:', user);

      return { message: 'Super admin registered successfully', userId: user._id };
    } catch (error) {
      console.error('Error in registerSuperAdmin:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering super admin');
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!user.password) {
        throw new InternalServerErrorException('User password not set');
      }
      if (await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user.toObject();
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error in validateUser:', error);
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      console.log('Attempting login for email:', loginDto.email);
      const user: UserDocument = await this.usersService.findByEmail(loginDto.email);
      console.log('User found:', user);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!user.password) {
        throw new InternalServerErrorException('User password not set');
      }
      console.log('Comparing passwords...');
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      console.log('Password matched, generating token...');
      const payload = { email: user.email, sub: user._id.toString(), role: user.role, isFirstLogin: user.isFirstLogin };
      const accessToken = this.jwtService.sign(payload);

      // पहली बार लॉगिन पर यूज़र की भाषा के आधार पर HTML ईमेल
      if (user.isFirstLogin) {
        const language = user.language || 'en';
        let welcomeSubject: string;
        let welcomeText: string;
        let welcomeHtml: string;

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
        } else {
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
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
        }
      }

      return { access_token: accessToken, isFirstLogin: user.isFirstLogin };
    } catch (error) {
      console.error('Error in login:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during login');
    }
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    try {
      const user: UserDocument = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!user.password) {
        throw new InternalServerErrorException('User password not set');
      }
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        throw new UnauthorizedException('Invalid old password');
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
      } catch (emailError) {
        console.error('Failed to send password change notification:', emailError);
      }

      return { message: 'Password changed successfully' };
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw new InternalServerErrorException('Error changing password');
    }
  }

  async requestOtp(email: string) {
    try {
      const otp = randomBytes(3).toString('hex').toUpperCase();
      const expires = new Date(Date.now() + 10 * 60 * 1000);
      await this.usersService.requestOtp(email, otp, expires);
      return { message: 'OTP sent to email' };
    } catch (error) {
      console.error('Error in requestOtp:', error);
      throw new InternalServerErrorException('Error requesting OTP');
    }
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    try {
      return this.usersService.resetPassword(email, otp, newPassword);
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw new InternalServerErrorException('Error resetting password');
    }
  }

  async generateJwtForSso(user: any) {
    try {
      const existingUser = await this.usersService.findByEmail(user.email);
      let userId;

      if (existingUser) {
        userId = existingUser._id.toString();
      } else {
        const newUser = await this.usersService.create({
          email: user.email,
          password: randomBytes(6).toString('hex'),
          role: user.role || 'USER',
        });
        userId = newUser._id.toString();
      }

      const payload = { email: user.email, sub: userId, role: user.role };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      console.error('Error in generateJwtForSso:', error);
      throw new InternalServerErrorException('Error generating JWT for SSO');
    }
  }
}