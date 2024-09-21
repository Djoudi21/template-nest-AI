import { Module } from '@nestjs/common';
import { GetCurrentUserUseCase } from '../../domain/use-cases/user/get-current-user-use-case';
import { PrismaService } from '../database/prisma.service';
import { PrismaUserRepository } from '../repositories/user/prisma-user.repository';

@Module({
  imports: [],
  providers: [
    GetCurrentUserUseCase,
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [GetCurrentUserUseCase],
})
export class UserModule {}
