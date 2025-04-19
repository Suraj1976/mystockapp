import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new BadRequestException(`User with email ${createUserDto.email} already exists`);
      }

      let password = createUserDto.password;
      if (!password) {
        password = randomBytes(6).toString('hex');
        console.log('Generated default password:', password);
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      const userData = {
        ...createUserDto,
        password: hash,
        companyId: createUserDto.companyId ? new Types.ObjectId(createUserDto.companyId) : undefined,
      };

      const user = new this.userModel(userData);
      const savedUser = await user.save();
      console.log('User created:', savedUser);
      return savedUser;
    } catch (error: unknown) {
      console.error('Error in create:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof Error && 'code' in error && error.code === 11000) {
        throw new BadRequestException('User with this email already exists');
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log('User found by email:', user);
      return user;
    } catch (error: unknown) {
      console.error('Error in findByEmail:', error);
      throw new InternalServerErrorException('Error finding user by email');
    }
  }

  async findById(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error: unknown) {
      console.error('Error in findById:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error finding user by ID');
    }
  }

  async findAll(tenantId: string): Promise<UserDocument[]> {
    try {
      const companyId = tenantId ? new Types.ObjectId(tenantId) : undefined;
      return await this.userModel.find({ companyId }).exec();
    } catch (error: unknown) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Error finding users');
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<UserDocument> {
    try {
      if (updateData.companyId && typeof updateData.companyId === 'string') {
        updateData.companyId = new Types.ObjectId(updateData.companyId);
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error: unknown) {
      console.error('Error in update:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async requestOtp(email: string, otp: string, expires: Date): Promise<UserDocument> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { email },
        { otp, otpExpires: expires },
        { new: true },
      ).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error: unknown) {
      console.error('Error in requestOtp:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error requesting OTP');
    }
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<UserDocument> {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.otp !== otp || !user.otpExpires || new Date() > user.otpExpires) {
        throw new BadRequestException('Invalid OTP');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(newPassword, salt);
      const updatedUser = await this.userModel.findOneAndUpdate(
        { email },
        { password: hash, otp: null, otpExpires: null },
        { new: true },
      ).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error: unknown) {
      console.error('Error in resetPassword:', error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error resetting password');
    }
  }

  async setInitialPassword(email: string, tempPassword: string, newPassword: string): Promise<UserDocument> {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!(await bcrypt.compare(tempPassword, user.password))) {
        throw new BadRequestException('Invalid temporary password');
      }
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(newPassword, salt);
      const updatedUser = await this.userModel.findOneAndUpdate(
        { email },
        { password: hash },
        { new: true },
      ).exec();
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error: unknown) {
      console.error('Error in setInitialPassword:', error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error setting initial password');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
    } catch (error: unknown) {
      console.error('Error in delete:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async deleteByCompanyId(companyId: string): Promise<void> {
    try {
      await this.userModel.deleteMany({ companyId: new Types.ObjectId(companyId) }).exec();
    } catch (error: unknown) {
      console.error('Error in deleteByCompanyId:', error);
      throw new InternalServerErrorException('Error deleting users for company');
    }
  }
}