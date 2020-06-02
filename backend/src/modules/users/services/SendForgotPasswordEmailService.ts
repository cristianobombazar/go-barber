import 'reflect-metadata'; // TODO remove after creating the provider for ITokenProvider.
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository,
    @inject('UsersTokensRepository')
    private tokensRepository: IUserTokensRepository,
    @inject('MailProvider') private mailProvider: IMailProvider
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const { email } = request;
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw AppError.create(`User does not exists.`);
    }

    const { token } = await this.tokensRepository.generate(user.id);
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recovery your password',
      template: {
        template: 'Olá, {{name}} : {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
