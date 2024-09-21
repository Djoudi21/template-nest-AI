import { Module } from '@nestjs/common';
import { RegisterUseCase } from '../../domain/use-cases/auth/register-use-case.service';
import { InMemoryPasswordHashingService } from '../../application/services/password-hashing/in-memory-password-hashing.service';
import { LoginUseCase } from '../../domain/use-cases/auth/login.use-case';
import { PrismaAuthRepository } from '../repositories/auth/prisma-auth.repository';
import { PrismaService } from '../database/prisma.service';
import { PrismaUserRepository } from '../repositories/user/prisma-user.repository';

@Module({
  imports: [],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    PrismaService,
    {
      provide: 'PasswordHashingService',
      useClass: InMemoryPasswordHashingService,
    },
    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepository,
    },
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [RegisterUseCase, LoginUseCase],
})
export class AuthModule {}
