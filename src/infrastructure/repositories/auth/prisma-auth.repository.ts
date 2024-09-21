import { UserEntity } from '../../../domain/entities/user.entity';
import { PrismaService } from '../../database/prisma.service';
import { UserMapperFactory } from '../../../application/mappers/user/user-mapper-factory';
import { IAuthRepository } from '../interfaces/auth.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}
  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    const mapper = UserMapperFactory.getMapper('prisma-user');
    return mapper.toEntity(newUser);
  }
}
