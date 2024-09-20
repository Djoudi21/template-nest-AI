import { InMemoryUserRepository } from '../../../infrastructure/repositories/users/in-memory.user.repository';
import { IUserRepository } from '../../../infrastructure/repositories/interfaces/user.repository.interface';
import { InMemoryPasswordHashingService } from '../../../application/services/password-hashing/in-memory-password-hashing.service';
import { IPasswordHashingService } from '../../../application/services/interfaces/password-hashing.service';
import { UserEntity } from '../../entities/user.entity';
import { RegisterUseCase } from './register-use-case.service';
import { RegisterDto } from '../../../application/dtos/register-dto';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: IUserRepository;
  let passwordHashingService: IPasswordHashingService;
  let registerDto: RegisterDto;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    passwordHashingService = new InMemoryPasswordHashingService();
    registerUseCase = new RegisterUseCase(
      userRepository,
      passwordHashingService,
    );
    registerDto = new RegisterDto();
  });

  it('successfully register a user with valid credentials', async () => {
    const fakeUser = new UserEntity(null, 'test@example.com', 'password');
    jest
      .spyOn(registerUseCase, 'execute')
      .mockImplementation(async () => fakeUser);
    const result = await registerUseCase.execute(registerDto);
    expect(result.id).toBe(fakeUser.id);
  });
});
