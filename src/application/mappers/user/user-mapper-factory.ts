import { UserEntity } from '../../../domain/entities/user.entity';
import { GetCurrentUserMapper } from './get-current-user.mapper';
import { LoginMapper } from './login.mapper';
import { PrismaUserMapper } from './prisma-user.mapper';
import { RegisterMapper } from './register.mapper';

type Mapper<T> = {
  toEntity(dto: T): UserEntity;
  toDto(entity: UserEntity): UserEntity;
};

export class UserMapperFactory {
  private static mappers = {
    'get-current-user': GetCurrentUserMapper,
    'prisma-user': PrismaUserMapper,
    login: LoginMapper,
    register: RegisterMapper,
  };

  static getMapper(type: string): Mapper<any> {
    const mapper = this.mappers[type];
    if (!mapper) {
      throw new Error(`No mapper found for type ${type}`);
    }
    return mapper;
  }
}
