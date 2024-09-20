import { IUserRepository } from '../interfaces/user.repository.interface';
import { InMemoryUserRepository } from './in-memory.user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';

describe('InMemoryUserRepository', () => {
  let inMemoryUserRepository: IUserRepository;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
  });

  describe('findById', () => {
    it('returns a user by id', async () => {
      const fakeUser = new UserEntity('1');
      jest
        .spyOn(inMemoryUserRepository, 'findById')
        .mockImplementation(async () => fakeUser);
      const result = await inMemoryUserRepository.findById(fakeUser.id);
      expect(result.id).toBe(fakeUser.id);
    });
    it('returns an error if no user found', async () => {
      const fakeUser = new UserEntity('1');
      jest
        .spyOn(inMemoryUserRepository, 'findById')
        .mockImplementation(async () => undefined);
      const result = await inMemoryUserRepository.findById(fakeUser.id);
      expect(result).toBeUndefined();
    });
  });

  describe('save', () => {
    it('save a user', async () => {
      const fakeUser = new UserEntity('1', 'john.doe@gmailcom');
      jest
        .spyOn(inMemoryUserRepository, 'save')
        .mockImplementation(async () => fakeUser);
      const result = await inMemoryUserRepository.save(fakeUser);
      expect(result.email).toBe(fakeUser.email);
    });
  });
});
