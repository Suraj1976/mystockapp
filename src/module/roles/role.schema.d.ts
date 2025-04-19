import { Document } from 'mongoose';
export type RoleDocument = Role & Document;
export declare class Role {
    role: string;
    permissions: {
        [module: string]: {
            view: boolean;
            create: boolean;
            edit: boolean;
            delete: boolean;
            approve?: boolean;
        };
    };
}
export declare const RoleSchema: import("mongoose").Schema<Role, import("mongoose").Model<Role, any, any, any, Document<unknown, any, Role> & Role & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Role, Document<unknown, {}, import("mongoose").FlatRecord<Role>> & import("mongoose").FlatRecord<Role> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
