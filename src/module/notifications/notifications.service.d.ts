import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { Server } from 'socket.io';
export declare class NotificationsService {
    private notificationModel;
    private io;
    constructor(notificationModel: Model<NotificationDocument>);
    setIo(io: Server): void;
    createNotification(userId: string, message: string): Promise<import("mongoose").Document<unknown, {}, NotificationDocument> & Notification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(userId: string): Promise<(import("mongoose").Document<unknown, {}, NotificationDocument> & Notification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, NotificationDocument> & Notification & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
