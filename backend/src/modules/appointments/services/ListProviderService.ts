import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  userId: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider
  ) {}

  public async execute(request: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.get<User[]>(
      `providers-list:${request.userId}`
    );
    if (!users) {
      users = await this.repository.findAllProviders({
        exceptUserId: request.userId,
      });
    }
    await this.cacheProvider.save(`providers-list:${request.userId}`, users);
    return users;
  }
}
export default ListProviderService;
