import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_USE_SSL'), // पोर्ट 587 के लिए false
      auth: {
        user: this.configService.get<string>('SENDER_EMAIL'),
        pass: this.configService.get<string>('SENDER_PASSWORD'),
      },
      // Gmail के लिए TLS सेटिंग्स को हटा दें, क्योंकि Gmail स्वचालित रूप से TLS को हैंडल करता है
    });

    // ट्रांसपोर्टर को सत्यापित करें
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP configuration error:', error);
      } else {
        console.log('SMTP server is ready to send emails');
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const mailOptions = {
        from: this.configService.get<string>('SENDER_EMAIL'),
        to,
        subject,
        text,
        html,
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error sending email');
    }
  }
}