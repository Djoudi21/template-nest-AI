import { UserMapperFactory } from '../../../application/mappers/user/user-mapper-factory';
import { IPasswordHashingService } from '../../../application/services/interfaces/password-hashing.service';
import { RegisterDto } from '../../../application/dtos/register-dto';
import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../../infrastructure/repositories/interfaces/auth.repository.interface';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: IAuthRepository,
    @Inject('PasswordHashingService')
    private readonly passwordHashingService: IPasswordHashingService,
  ) {}

  async execute(createUserDto: RegisterDto) {
    // Map the DTO to a domain entity
    const mapper = UserMapperFactory.getMapper('register');
    const userEntity = mapper.toEntity(createUserDto);
    // Hash the user's password
    const hashedPassword = await this.passwordHashingService.hash(
      userEntity.password,
    );
    userEntity.setPassword(hashedPassword);
    // Save the entity via the repository
    const savedUser = await this.authRepository.createUser(userEntity);
    // Map the saved user entity back to a DTO
    return mapper.toDto(savedUser);
  }
}
