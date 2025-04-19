import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
import { UserDocument } from '../users/user.schema';
import { UserRole } from '../../enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async registerSuperAdmin(email: string, password: string): Promise<{ message: string; userId: string }> {
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
        role: UserRole.SUPER_SUPER_ADMIN,
      });
      console.log('Super admin created:', user);

      return { message: 'Super admin registered successfully', userId: user._id.toString() };
    } catch (error: unknown) {
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
    } catch (error: unknown) {
      console.error('Error in validateUser:', error);
      if (error instanceof UnauthorizedException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; isFirstLogin: boolean }> {
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

      if (user.isFirstLogin) {
        const language = user.language || 'hi';
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
        } catch (emailError: unknown) {
          console.error('Failed to send welcome email:', emailError instanceof Error ? emailError.message : 'Unknown error');
        }
      }

      return { access_token: accessToken, isFirstLogin: user.isFirstLogin };
    } catch (error: unknown) {
      console.error('Error in login:', error);
      if (error instanceof UnauthorizedException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during login');
    }
  }

  async changePassword(email: string, oldPassword: string, newPassword: string): Promise<{ message: string }> {
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
      } catch (emailError: unknown) {
        console.error('Failed to send notification email:', emailError instanceof Error ? emailError.message : 'Unknown error');
      }

      return { message: 'Password changed successfully' };
    } catch (error: unknown) {
      console.error('Error in changePassword:', error);
      if (error instanceof UnauthorizedException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Error changing password');
    }
  }

  async requestOtp(email: string): Promise<{ message: string }> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate OTP and expiration time
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

      // Save OTP and expiration to user
      await this.usersService.requestOtp(email, otp, otpExpires);

      // Send OTP via email
      const language = user.language || 'hi';
      let subject: string;
      let text: string;
      let html: string;

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
      } else {
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
    } catch (error: unknown) {
      console.error('Error in requestOtp:', error);
      if (error instanceof UnauthorizedException || error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException('Error sending OTP');
    }
  }
}