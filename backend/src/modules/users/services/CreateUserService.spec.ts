import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let repository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let service: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    service = new CreateUserService(
      repository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await service.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '12345',
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com.br');
  });

  it('Should not be able to create a new user using a email already taken', async () => {
    await service.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '12345',
    });

    await expect(
      service.execute({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
