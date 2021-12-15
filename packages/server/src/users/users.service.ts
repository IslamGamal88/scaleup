import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserArgs, LoginUserArgs, UpdateUserArgs } from './dto/user.args';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async register({ email, password, username }: CreateUserArgs): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = this.repo.create({
      email,
      password: hashedPassword,
      username,
    });
    return this.repo.save(user);
  }

  async login({ email, password }: LoginUserArgs): Promise<User> {
    const user = await this.repo.findOne({ email });
    const verifiedUser = await bcrypt.verify(user.password, password);
    if (!verifiedUser) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  findOne(id: number): Promise<User> {
    return this.repo.findOne(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.repo.remove(user);
  }

  async update(id: number, attrs: UpdateUserArgs): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
}
