import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IAuthRepository } from '../interfaces/auth.repository.interface';

@Injectable()
export class InMemoryAuthRepository implements IAuthRepository {
  private users: UserEntity[] = [];

  async createUser(user: UserEntity): Promise<UserEntity> {
    user.id = (this.users.length + 1).toString();
    this.users.push(user);
    return user;
  }
}
