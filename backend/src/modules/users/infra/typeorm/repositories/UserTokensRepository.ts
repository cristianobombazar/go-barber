import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = await this.repository.create({
      userId,
    });
    await this.repository.save(userToken);
    return userToken;
  }
}

export default UserTokensRepository;
