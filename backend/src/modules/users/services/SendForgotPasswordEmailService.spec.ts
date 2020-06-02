import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersTokenRepository from '@modules/users/repositories/fake/FakeUsersTokenRepository';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let repository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUsersTokenRepository;
let mailProvider: FakeMailProvider;
let service: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUsersTokenRepository();
    repository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();
    service = new SendForgotPasswordEmailService(
      repository,
      fakeUserTokensRepository,
      mailProvider
    );
  });

  it('Should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await repository.create({
      email: 'johndoe@example.com.br',
      name: 'John Doe',
      password: '123456',
    });

    await service.execute({
      email: 'johndoe@example.com.br',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('Should bot be able to recover the password on a non existing user', async () => {
    await expect(
      service.execute({
        email: 'johndoe@example.com.br',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await repository.create({
      email: 'johndoe@example.com.br',
      name: 'John Doe',
      password: '123456',
    });

    await service.execute({
      email: 'johndoe@example.com.br',
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
