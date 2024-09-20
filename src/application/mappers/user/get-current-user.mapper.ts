import { UserEntity } from '../../../domain/entities/user.entity';
import { GetCurrentUserDto } from '../../dtos/get-current-user-dto';

export class GetCurrentUserMapper {
  static toEntity(dto: GetCurrentUserDto): UserEntity {
    const user = new UserEntity();
    user.id = dto.id;
    return user;
  }

  static toDto(userEntity: UserEntity) {
    console.log('TOTO', userEntity);
    return {
      id: userEntity.id,
      email: userEntity.email,
    };
  }
}
