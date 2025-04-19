import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
export declare class QuotationsController {
    private readonly quotationsService;
    constructor(quotationsService: QuotationsService);
    create(req: any, createQuotationDto: CreateQuotationDto): Promise<import("./quotation.schema").QuotationDocument>;
    findAll(): Promise<import("./quotation.schema").QuotationDocument[]>;
    findOne(id: string): Promise<import("./quotation.schema").QuotationDocument>;
    update(id: string, req: any, updateQuotationDto: UpdateQuotationDto): Promise<import("./quotation.schema").QuotationDocument>;
    remove(id: string, req: any): Promise<void>;
}
