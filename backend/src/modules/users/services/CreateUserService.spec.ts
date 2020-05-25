import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const service = new CreateUserService(repository, fakeHashProvider);

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
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const service = new CreateUserService(repository, fakeHashProvider);

    await service.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '12345',
    });

    expect(
      service.execute({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
