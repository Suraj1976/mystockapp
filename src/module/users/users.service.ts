import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<UserDocument> {
    try {
      console.log('Creating user with data:', createUserDto);
      let password = createUserDto.password;
      if (!password) {
        password = randomBytes(6).toString('hex');
        console.log('Generated default password:', password);
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      console.log('Hashed password:', hash);
      const user = new this.userModel({ ...createUserDto, password: hash });
      const savedUser = await user.save();
      console.log('User created:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error in create:', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findByEmail(email: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log('User found by email:', user);
      return user;
    } catch (error) {
      console.error('Error in findByEmail:', error);
      throw new InternalServerErrorException('Error finding user by email');
    }
  }

  async findAll(tenantId: string): Promise<UserDocument[]> {
    try {
      return await this.userModel.find({ companyId: tenantId }).exec();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Error finding users');
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<UserDocument> {
    try {
      // companyId को ObjectId में कन्वर्ट करें अगर यह एक स्ट्रिंग है
      if (updateData.companyId && typeof updateData.companyId === 'string') {
        updateData.companyId = new Types.ObjectId(updateData.companyId);
      }
      return await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    } catch (error) {
      console.error('Error in update:', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async requestOtp(email: string, otp: string, expires: Date): Promise<UserDocument> {
    try {
      return await this.userModel.findOneAndUpdate({ email }, { otp, otpExpires: expires }, { new: true }).exec();
    } catch (error) {
      console.error('Error in requestOtp:', error);
      throw new InternalServerErrorException('Error requesting OTP');
    }
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<UserDocument> {
    try {
      const user = await this.findByEmail(email);
      if (!user || user.otp !== otp || new Date() > user.otpExpires) throw new Error('Invalid OTP');
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(newPassword, salt);
      return await this.userModel.findOneAndUpdate({ email }, { password: hash, otp: null, otpExpires: null }, { new: true }).exec();
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw new InternalServerErrorException('Error resetting password');
    }
  }

  async setInitialPassword(email: string, tempPassword: string, newPassword: string): Promise<UserDocument> {
    try {
      const user = await this.findByEmail(email);
      if (!user || !(await bcrypt.compare(tempPassword, user.password))) {
        throw new Error('Invalid temporary password');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(newPassword, salt);
      return await this.userModel.findOneAndUpdate({ email }, { password: hash }, { new: true }).exec();
    } catch (error) {
      console.error('Error in setInitialPassword:', error);
      throw new InternalServerErrorException('Error setting initial password');
    }
  }
}