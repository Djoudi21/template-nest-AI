import { UserEntity } from '../../../domain/entities/user.entity';
import { InMemoryAuthRepository } from './in-memory.auth.repository';
import { IAuthRepository } from '../interfaces/auth.repository.interface';

describe('InMemoryUserRepository', () => {
  let inMemoryAuthRepository: IAuthRepository;

  beforeEach(() => {
    inMemoryAuthRepository = new InMemoryAuthRepository();
  });
  describe('createUser', () => {
    it('save a user', async () => {
      const fakeUser = new UserEntity('1', 'john.doe@gmailcom');
      jest
        .spyOn(inMemoryAuthRepository, 'createUser')
        .mockImplementation(async () => fakeUser);
      const result = await inMemoryAuthRepository.createUser(fakeUser);
      expect(result.email).toBe(fakeUser.email);
    });
  });
});
