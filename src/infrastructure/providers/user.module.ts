import { Module } from '@nestjs/common';
import { RegisterUseCase } from '../../domain/use-cases/user/register-use-case.service';
import { InMemoryPasswordHashingService } from '../../application/services/password-hashing/in-memory-password-hashing.service';
import { InMemoryUserRepository } from '../repositories/users/in-memory.user.repository';
import { GetCurrentUserUseCase } from '../../domain/use-cases/user/get-current-user-use-case';
import { LoginUseCase } from '../../domain/use-cases/user/login.use-case';

@Module({
  imports: [],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    GetCurrentUserUseCase,
    {
      provide: 'PasswordHashingService',
      useClass: InMemoryPasswordHashingService,
    },
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [RegisterUseCase, LoginUseCase, GetCurrentUserUseCase],
})
export class UserModule {}
