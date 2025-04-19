import { Document } from 'mongoose';
export type PackageDocument = Package & Document;
export declare class Package {
    name: string;
    duration: number;
    userLimit: number;
    features: string[];
}
export declare const PackageSchema: import("mongoose").Schema<Package, import("mongoose").Model<Package, any, any, any, Document<unknown, any, Package> & Package & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Package, Document<unknown, {}, import("mongoose").FlatRecord<Package>> & import("mongoose").FlatRecord<Package> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
