import { injectable, inject } from 'tsyringe';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { differenceInHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository,
    @inject('UsersTokensRepository')
    private tokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(request: IRequest): Promise<void> {
    const userToken = await this.tokensRepository.findByToken(request.token);
    if (!userToken) {
      throw AppError.create('User token does not exist');
    }
    const user = await this.repository.findById(userToken.userId);
    if (!user) {
      throw AppError.create('User does not exist');
    }
    if (differenceInHours(Date.now(), userToken.createdAt) > 2) {
      throw AppError.create('Token expired');
    }
    user.password = await this.hashProvider.generateHash(request.password);
    await this.repository.save(user);
  }
}
