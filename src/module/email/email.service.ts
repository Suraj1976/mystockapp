import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST') || 'smtp.example.com',
      port: this.configService.get<number>('SMTP_PORT') || 587,
      secure: this.configService.get<boolean>('SMTP_USE_SSL') || false, // Port 587 के लिए false
      auth: {
        user: this.configService.get<string>('SENDER_EMAIL') || 'default@example.com',
        pass: this.configService.get<string>('SENDER_PASSWORD') || 'defaultpassword',
      },
    });

    // ट्रांसपोर्टर को सत्यापित करें (async/await का उपयोग करें)
    this.verifyTransporter();
  }

  private async verifyTransporter(): Promise<void> {
    try {
      await this.transporter.verify();
      console.log('SMTP server is ready to send emails');
    } catch (error: unknown) {
      console.error('SMTP configuration error:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async sendEmail(to: string, subject: string, text: string, html?: string): Promise<nodemailer.SentMessageInfo> {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: this.configService.get<string>('SENDER_EMAIL') || 'default@example.com',
        to,
        subject,
        text,
        html,
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return info;
    } catch (error: unknown) {
      console.error('Error sending email:', error instanceof Error ? error.message : 'Unknown error');
      throw new InternalServerErrorException('Error sending email');
    }
  }

  async sendCompanyAdminCredentials(to: string, tempPassword: string, language: string): Promise<nodemailer.SentMessageInfo> {
    const subject = language === 'hi' ? 'स्वागत - आपका एडमिन खाता तैयार है' : 'Welcome - Your Admin Account is Ready';
    const text = language === 'hi'
      ? `नमस्ते,\n\nआपका अस्थायी पासवर्ड है: ${tempPassword}\nलॉगिन करें: http://localhost:3000/auth/login\n`
      : `Hello,\n\nYour temporary password is: ${tempPassword}\nLogin at: http://localhost:3000/auth/login\n`;
    const html = language === 'hi'
      ? `<p>नमस्ते,</p><p>आपका अस्थायी पासवर्ड है: <strong>${tempPassword}</strong></p><p><a href="http://localhost:3000/auth/login">लॉगिन करें</a></p>`
      : `<p>Hello,</p><p>Your temporary password is: <strong>${tempPassword}</strong></p><p><a href="http://localhost:3000/auth/login">Login</a></p>`;

    return await this.sendEmail(to, subject, text, html);
  }
}