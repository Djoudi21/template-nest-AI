import { InMemoryPasswordHashingService } from '../../../application/services/password-hashing/in-memory-password-hashing.service';
import { IPasswordHashingService } from '../../../application/services/interfaces/password-hashing.service';
import { UserEntity } from '../../entities/user.entity';
import { RegisterUseCase } from './register-use-case.service';
import { RegisterDto } from '../../../application/dtos/register-dto';
import { InMemoryAuthRepository } from '../../../infrastructure/repositories/auth/in-memory.auth.repository';
import { IAuthRepository } from '../../../infrastructure/repositories/interfaces/auth.repository.interface';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let authRepository: IAuthRepository;
  let passwordHashingService: IPasswordHashingService;
  let registerDto: RegisterDto;

  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    passwordHashingService = new InMemoryPasswordHashingService();
    registerUseCase = new RegisterUseCase(
      authRepository,
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
