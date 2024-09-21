import { IUserRepository } from '../../../infrastructure/repositories/interfaces/user.repository.interface';
import { UserMapperFactory } from '../../../application/mappers/user/user-mapper-factory';
import { GetCurrentUserDto } from '../../../application/dtos/get-current-user-dto';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(getCurrentUserDto: GetCurrentUserDto) {
    // Map the DTO to a domain entity
    const mapper = UserMapperFactory.getMapper('get-current-user');
    const userEntity = mapper.toEntity(getCurrentUserDto);
    // Get the current user
    const currentUser = await this.userRepository.findById(userEntity.id);
    // Map the returned user entity back to a DTO
    return mapper.toDto(currentUser);
  }
}
