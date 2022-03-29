import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserInput, getUserProjectByUserId } from './dto/user-input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async verify(token: string) {
    const secretStr = await this.jwtService.verify(token);
    return {
      ...secretStr,
    };
  }

  async createNewUser(userInfo: createUserInput): Promise<User> {
    const { email, password, username } = userInfo;
    const isUserExists = await this.userRepository.findOne({
      where: { email },
    });
    if (isUserExists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });
    const result = await this.userRepository.save(userData);
    return result;
  }

  async getUserProjectById(userId: getUserProjectByUserId): Promise<User> {
    return this.userRepository.findOne({ relations: ['post'] });
  }
}
