import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let repository: FakeUsersRepository;
let service: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    service = new ShowProfileService(repository);
  });

  it('Should be able to show the profile profile', async () => {
    const user = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await service.execute({
      userId: user.id,
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('Should not be able to show a non existing profile', async () => {
    await expect(
      service.execute({
        userId: 'non-existing user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
