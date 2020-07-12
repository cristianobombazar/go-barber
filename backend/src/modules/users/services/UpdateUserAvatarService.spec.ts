import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let repository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let service: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    service = new UpdateUserAvatarService(repository, fakeStorageProvider);
  });

  it('Should be able to update users avatar', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await service.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('Should not be able to update users avatar', async () => {
    await expect(
      service.execute({
        userId: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to delete old avatar when the user update a new one', async () => {
    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await service.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await service.execute({
      userId: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
