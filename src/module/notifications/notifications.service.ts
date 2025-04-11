import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { Server } from 'socket.io';

@Injectable()
export class NotificationsService {
  private io: Server;

  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  setIo(io: Server) {
    this.io = io;
  }

  async createNotification(userId: string, message: string) {
    const notification = new this.notificationModel({ userId, message });
    await notification.save();
    this.io.to(userId).emit('notification', notification);
    return notification;
  }

  async findAll(userId: string) {
    return this.notificationModel.find({ userId }).exec();
  }

  async markAsRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(id, { read: true }).exec();
  }
}