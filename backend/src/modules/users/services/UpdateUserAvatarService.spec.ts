import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import UpdateUserAvatarServvice from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Should be able to update users avatar', async () => {
    const repository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const service = new UpdateUserAvatarServvice(
      repository,
      fakeStorageProvider
    );

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
    const repository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const service = new UpdateUserAvatarServvice(
      repository,
      fakeStorageProvider
    );

    expect(
      service.execute({
        userId: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to delete old avatar when the user update a new one', async () => {
    const repository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const service = new UpdateUserAvatarServvice(
      repository,
      fakeStorageProvider
    );

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
    expect(user.avatar).toBe('avatar.jpg');
  });
});
