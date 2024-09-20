import { UserEntity } from '../../../domain/entities/user.entity';
import { RegisterMapper } from './register.mapper';
import { GetCurrentUserMapper } from './get-current-user.mapper';
import { LoginMapper } from './login.mapper';

type Mapper<T> = {
  toEntity(dto: T): UserEntity;
  toDto(entity: UserEntity): UserEntity;
};

export class UserMapperFactory {
  private static mappers = {
    register: RegisterMapper,
    'get-current-user': GetCurrentUserMapper,
    login: LoginMapper,
  };

  static getMapper(type: string): Mapper<any> {
    const mapper = this.mappers[type];
    if (!mapper) {
      throw new Error(`No mapper found for type ${type}`);
    }
    return mapper;
  }
}
