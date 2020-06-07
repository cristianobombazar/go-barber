import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository
  ) {}

  public async execute(request: IRequest): Promise<User[]> {
    const user = await this.repository.findAllProviders({
      exceptUserId: request.userId,
    });
    return user;
  }
}
export default ListProviderService;
