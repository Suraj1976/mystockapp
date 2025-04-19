import { SettingsService } from './settings.service';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    setLanguage(language: string, req: any): Promise<import("../users/user.schema").UserDocument>;
}
