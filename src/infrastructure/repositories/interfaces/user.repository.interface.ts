import { UserEntity } from '../../../domain/entities/user.entity';

export interface IUserRepository {
  findByEmail(email: UserEntity['email']): Promise<UserEntity | null>;
  findById(userId: UserEntity['id']): Promise<UserEntity | null>;
}
