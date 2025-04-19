import { ExportService } from './export.service';
export declare class ExportController {
    private readonly exportService;
    constructor(exportService: ExportService);
    exportUsers(tenantId: string): Promise<string>;
    exportCompanies(tenantId: string): Promise<string>;
    exportClients(tenantId: string): Promise<string>;
}
