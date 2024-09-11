import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    await createdUser.save();

    return createdUser;
  }

  // Buscar un usuario por email
  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async getMyProfile(userId: string) {
    const foundUser = await this.userModel.findById(userId).exec();

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return {
      email: foundUser.email,
      name: foundUser.name,
    };
  }
}
