import { IUserRepository } from '../../../infrastructure/repositories/interfaces/user.repository.interface';
import { UserMapperFactory } from '../../../application/mappers/user/user-mapper-factory';
import { IPasswordHashingService } from '../../../application/services/interfaces/password-hashing.service';
import { RegisterDto } from '../../../application/dtos/register-dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
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
    const savedUser = await this.userRepository.save(userEntity);
    // Map the saved user entity back to a DTO
    return mapper.toDto(savedUser);
  }
}
