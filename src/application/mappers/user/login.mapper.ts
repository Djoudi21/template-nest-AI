import { UserEntity } from '../../../domain/entities/user.entity';
import { LoginDto } from '../../dtos/login-dto';

export class LoginMapper {
  static toEntity(dto: LoginDto): UserEntity {
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
