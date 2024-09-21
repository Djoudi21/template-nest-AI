import { UserEntity } from '../../../domain/entities/user.entity';

export class PrismaUserMapper {
  static toEntity(newUser: UserEntity): UserEntity {
    return new UserEntity(
      newUser.id,
      newUser.email,
      newUser.password,
      newUser.createdAt,
      newUser.updatedAt,
    );
  }

  static toDto(userEntity: UserEntity) {
    return {
      id: userEntity.id,
      email: userEntity.email,
    };
  }
}
