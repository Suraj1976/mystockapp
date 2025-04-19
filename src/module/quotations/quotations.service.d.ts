import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { Model } from 'mongoose';
import { QuotationDocument } from './quotation.schema';
import { UserRole } from '../../enums/user-role.enum';
export declare class QuotationsService {
    private quotationModel;
    constructor(quotationModel: Model<QuotationDocument>);
    create(createQuotationDto: CreateQuotationDto, user: {
        userId: string;
        role: UserRole;
    }): Promise<QuotationDocument>;
    findAll(): Promise<QuotationDocument[]>;
    findOne(id: string): Promise<QuotationDocument>;
    update(id: string, updateQuotationDto: UpdateQuotationDto, user: {
        userId: string;
        role: UserRole;
    }): Promise<QuotationDocument>;
    remove(id: string, user: {
        userId: string;
        role: UserRole;
    }): Promise<void>;
}
