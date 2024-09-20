import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../../../application/dtos/login-dto';
import { IPasswordHashingService } from '../../../application/services/interfaces/password-hashing.service';
import { UserMapperFactory } from '../../../application/mappers/user/user-mapper-factory';
import { IUserRepository } from '../../../infrastructure/repositories/interfaces/user.repository.interface';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('PasswordHashingService')
    private readonly passwordHashingService: IPasswordHashingService,
  ) {}

  async execute(loginDto: LoginDto): Promise<UserEntity> {
    // Map the DTO to a domain entity
    const mapper = UserMapperFactory.getMapper('login');
    const userEntity = mapper.toEntity(loginDto);

    // Check for existing user
    const email = userEntity.email.trim().toLowerCase();
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('No user found');

    // Check credentials
    const isValidCredentials = await this.passwordHashingService.compare(
      userEntity.password,
      user.password,
    );

    if (!isValidCredentials) throw new Error('Invalid credentials');

    return mapper.toDto(user);
  }
}
