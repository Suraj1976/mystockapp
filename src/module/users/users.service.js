"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.findByEmail(createUserDto.email);
            if (existingUser) {
                throw new common_1.BadRequestException(`User with email ${createUserDto.email} already exists`);
            }
            let password = createUserDto.password;
            if (!password) {
                password = (0, crypto_1.randomBytes)(6).toString('hex');
                console.log('Generated default password:', password);
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            const userData = Object.assign(Object.assign({}, createUserDto), { password: hash, companyId: createUserDto.companyId ? new mongoose_2.Types.ObjectId(createUserDto.companyId) : undefined });
            const user = new this.userModel(userData);
            const savedUser = await user.save();
            console.log('User created:', savedUser);
            return savedUser;
        }
        catch (error) {
            console.error('Error in create:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            if (error instanceof Error && 'code' in error && error.code === 11000) {
                throw new common_1.BadRequestException('User with this email already exists');
            }
            throw new common_1.InternalServerErrorException('Error creating user');
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            console.log('User found by email:', user);
            return user;
        }
        catch (error) {
            console.error('Error in findByEmail:', error);
            throw new common_1.InternalServerErrorException('Error finding user by email');
        }
    }
    async findById(id) {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            console.error('Error in findById:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error finding user by ID');
        }
    }
    async findAll(tenantId) {
        try {
            const companyId = tenantId ? new mongoose_2.Types.ObjectId(tenantId) : undefined;
            return await this.userModel.find({ companyId }).exec();
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new common_1.InternalServerErrorException('Error finding users');
        }
    }
    async update(id, updateData) {
        try {
            if (updateData.companyId && typeof updateData.companyId === 'string') {
                updateData.companyId = new mongoose_2.Types.ObjectId(updateData.companyId);
            }
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Error in update:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error updating user');
        }
    }
    async requestOtp(email, otp, expires) {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate({ email }, { otp, otpExpires: expires }, { new: true }).exec();
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Error in requestOtp:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error requesting OTP');
        }
    }
    async resetPassword(email, otp, newPassword) {
        try {
            const user = await this.findByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (user.otp !== otp || !user.otpExpires || new Date() > user.otpExpires) {
                throw new common_1.BadRequestException('Invalid OTP');
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(newPassword, salt);
            const updatedUser = await this.userModel.findOneAndUpdate({ email }, { password: hash, otp: null, otpExpires: null }, { new: true }).exec();
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Error in resetPassword:', error);
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error resetting password');
        }
    }
    async setInitialPassword(email, tempPassword, newPassword) {
        try {
            const user = await this.findByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!(await bcrypt.compare(tempPassword, user.password))) {
                throw new common_1.BadRequestException('Invalid temporary password');
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(newPassword, salt);
            const updatedUser = await this.userModel.findOneAndUpdate({ email }, { password: hash }, { new: true }).exec();
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            console.error('Error in setInitialPassword:', error);
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error setting initial password');
        }
    }
    async delete(id) {
        try {
            const user = await this.userModel.findByIdAndDelete(id).exec();
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
        }
        catch (error) {
            console.error('Error in delete:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error deleting user');
        }
    }
    async deleteByCompanyId(companyId) {
        try {
            await this.userModel.deleteMany({ companyId: new mongoose_2.Types.ObjectId(companyId) }).exec();
        }
        catch (error) {
            console.error('Error in deleteByCompanyId:', error);
            throw new common_1.InternalServerErrorException('Error deleting users for company');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
