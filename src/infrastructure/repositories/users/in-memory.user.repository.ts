import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../interfaces/user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async findByEmail(email: UserEntity['email']): Promise<UserEntity> {
    const user = this.users.find((e) => e.email === email);
    return Promise.resolve(user);
  }

  async findById(userId: UserEntity['id']): Promise<UserEntity | undefined> {
    const user = this.users.find((e) => e.id === userId);
    if (!user) return Promise.reject('User not found');
    return Promise.resolve(user);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    user.id = (this.users.length + 1).toString();
    this.users.push(user);
    return user;
  }
}
