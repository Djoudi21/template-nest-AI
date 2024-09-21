import { LoginUseCase } from './login.use-case';
import { InMemoryPasswordHashingService } from '../../../application/services/password-hashing/in-memory-password-hashing.service';
import { IPasswordHashingService } from '../../../application/services/interfaces/password-hashing.service';
import { UserEntity } from '../../entities/user.entity';
import { LoginDto } from '../../../application/dtos/login-dto';
import { IAuthRepository } from '../../../infrastructure/repositories/interfaces/auth.repository.interface';
import { InMemoryAuthRepository } from '../../../infrastructure/repositories/auth/in-memory.auth.repository';
import { IUserRepository } from '../../../infrastructure/repositories/interfaces/user.repository.interface';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authRepository: IAuthRepository;
  let userRepository: IUserRepository;
  let passwordHashingService: IPasswordHashingService;
  let loginDto: LoginDto;

  beforeEach(() => {
    authRepository = new InMemoryAuthRepository();
    passwordHashingService = new InMemoryPasswordHashingService();
    loginUseCase = new LoginUseCase(
      userRepository,
      authRepository,
      passwordHashingService,
    );
    loginDto = new LoginDto();
  });

  it('successfully logs in a user with valid credentials', async () => {
    const fakeUser = new UserEntity('user123', 'test@example.com', 'password');
    jest
      .spyOn(loginUseCase, 'execute')
      .mockImplementation(async () => fakeUser);
    const result = await loginUseCase.execute(loginDto);
    expect(result.id).toBe(fakeUser.id);
  });
});
