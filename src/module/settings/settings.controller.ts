import { Controller, Put, Body, UseGuards, Request } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Put('language')
  async setLanguage(@Body('language') language: string, @Request() req) {
    return this.settingsService.setLanguage(req.user._id, language);
  }
}