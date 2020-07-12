import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import AuthenticateUser from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let repository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let service: AuthenticateUser;
let userService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    service = new AuthenticateUser(repository, fakeHashProvider);
    userService = new CreateUserService(
      repository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('Should be able to authenticate the user', async () => {
    const user = await userService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '12345',
    });
    const response = await service.execute({
      email: 'johndoe@example.com.br',
      password: '12345',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user', async () => {
    await expect(
      service.execute({
        email: 'johndoe@example.com.br',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to authenticate the user with wrong password', async () => {
    await userService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '12345',
    });

    await expect(
      service.execute({
        email: 'johndoe@example.com.br',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
