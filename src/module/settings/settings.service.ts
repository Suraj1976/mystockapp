import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SettingsService {
  constructor(private usersService: UsersService) {}

  async setLanguage(userId: string, language: string) {
    const supportedLanguages = ['en', 'hi', 'es'];
    if (!supportedLanguages.includes(language)) throw new BadRequestException('Unsupported language');
    return this.usersService.update(userId, { language });
  }

  translate(message: string, language: string): string {
    const translations = {
      en: { welcome: 'Welcome' },
      hi: { welcome: 'स्वागत' },
      es: { welcome: 'Bienvenido' },
    };
    return translations[language]?.[message] || message;
  }
}