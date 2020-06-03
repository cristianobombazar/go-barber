import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let repository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let service: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    service = new UpdateProfileService(repository, fakeHashProvider);
  });

  it('Should be able to update users profile', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await service.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntrê@example.com',
    });
    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntrê@example.com');
  });

  it('Should be able to change the email for a email taken', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await repository.create({
      name: 'John Doe',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      service.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await service.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntrê@example.com',
      password: '123123',
      oldPassword: '123456',
    });
    expect(updatedUser.password).toBe('123123');
  });

  it('Should be able to update the password without the old password', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      service.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntrê@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password without wrong old password', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      service.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntrê@example.com',
        password: '123123',
        oldPassword: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
