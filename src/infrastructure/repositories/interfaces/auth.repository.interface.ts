import { UserEntity } from '../../../domain/entities/user.entity';

export interface IAuthRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
}
