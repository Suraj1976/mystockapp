import { Document } from 'mongoose';
export type NotificationDocument = Notification & Document;
export declare class Notification {
    userId: string;
    message: string;
    read: boolean;
    timestamp: Date;
}
export declare const NotificationSchema: import("mongoose").Schema<Notification, import("mongoose").Model<Notification, any, any, any, Document<unknown, any, Notification> & Notification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, Document<unknown, {}, import("mongoose").FlatRecord<Notification>> & import("mongoose").FlatRecord<Notification> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
