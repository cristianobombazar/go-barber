import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import AuthenticateUser from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate the user', async () => {
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const service = new AuthenticateUser(repository, fakeHashProvider);
    const userService = new CreateUserService(repository, fakeHashProvider);

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
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const service = new AuthenticateUser(repository, fakeHashProvider);

    expect(
      service.execute({
        email: 'johndoe@example.com.br',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to authenticate the user with wrong password', async () => {
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const service = new AuthenticateUser(repository, fakeHashProvider);
    const userService = new CreateUserService(repository, fakeHashProvider);

    await userService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '12345',
    });

    expect(
      service.execute({
        email: 'johndoe@example.com.br',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
