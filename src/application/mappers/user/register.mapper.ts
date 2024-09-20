import { UserEntity } from '../../../domain/entities/user.entity';
import { RegisterDto } from '../../dtos/register-dto';

export class RegisterMapper {
  static toEntity(dto: RegisterDto): UserEntity {
    const user = new UserEntity();
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toDto(userEntity: UserEntity) {
    return {
      id: userEntity.id,
      email: userEntity.email,
    };
  }
}
