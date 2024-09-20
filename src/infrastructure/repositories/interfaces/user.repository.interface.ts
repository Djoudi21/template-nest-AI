import { UserEntity } from '../../../domain/entities/user.entity';

export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findByEmail(email: UserEntity['email']): Promise<UserEntity>;
  findById(userId: UserEntity['id']): Promise<UserEntity>;
}
