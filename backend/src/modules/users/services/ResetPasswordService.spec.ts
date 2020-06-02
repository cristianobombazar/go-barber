import FakeUsersTokenRepository from '@modules/users/repositories/fake/FakeUsersTokenRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let repository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUsersTokenRepository;
let service: ResetPasswordService;
let hashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUsersTokenRepository();
    repository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new ResetPasswordService(
      repository,
      fakeUserTokensRepository,
      hashProvider
    );
  });

  it('Should be able to reset the password ', async () => {
    const user = await repository.create({
      email: 'johndoe@example.com.br',
      name: 'John Doe',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    await service.execute({
      password: '123123',
      token: userToken.token,
    });

    const updateUser = await repository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('Should not be able to reset the password with non existing token ', async () => {
    await expect(
      service.execute({
        token: 'non-existing-token',
        password: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with non existing user', async () => {
    const tokenUser = await fakeUserTokensRepository.generate(
      'non-existing-user'
    );
    await expect(
      service.execute({
        token: tokenUser.token,
        password: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  /*
  it('Should not be able to reset the password after two hours', async () => {
    const user = await repository.create({
      email: 'johndoe@example.com.br',
      name: 'John Doe',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      service.execute({
        password: '123123',
        token: userToken.token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  */
});
