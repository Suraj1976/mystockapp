import { Document, Types } from 'mongoose';
export type CompanyDocument = Company & Document;
export declare class Company {
    name: string;
    authorizedPerson: string;
    designation: string;
    address: string;
    email: string;
    contactNo: string;
    gstNo: string;
    createdBy: string;
    licenseNumber: string;
    packageId: Types.ObjectId;
    associatedCompanies: Types.ObjectId[];
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, Document<unknown, any, Company> & Company & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, Document<unknown, {}, import("mongoose").FlatRecord<Company>> & import("mongoose").FlatRecord<Company> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
