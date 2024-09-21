import { IUserRepository } from '../interfaces/user.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { PrismaService } from '../../database/prisma.service';
import { UserMapperFactory } from '../../../application/mappers/user/user-mapper-factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: UserEntity['email']): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    const mapper = UserMapperFactory.getMapper('prisma-user');
    return mapper.toEntity(user);
  }

  async findById(userId: UserEntity['id']): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return null;
    // Map the Prisma result to a UserEntity instance
    return new UserEntity(
      user.id,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
