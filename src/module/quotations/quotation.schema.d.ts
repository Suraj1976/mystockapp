import { Document, Types } from 'mongoose';
export declare class Quotation extends Document {
    clientId: string;
    amount: number;
    createdBy: Types.ObjectId;
    company: string;
}
export type QuotationDocument = Quotation & Document;
export declare const QuotationSchema: import("mongoose").Schema<Quotation, import("mongoose").Model<Quotation, any, any, any, Document<unknown, any, Quotation> & Quotation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quotation, Document<unknown, {}, import("mongoose").FlatRecord<Quotation>> & import("mongoose").FlatRecord<Quotation> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
