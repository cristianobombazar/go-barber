import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository
  ) {}

  public async execute(request: IRequest): Promise<User> {
    const user = await this.repository.findById(request.userId);
    if (!user) {
      throw AppError.create('User does not exist');
    }
    return user;
  }
}
export default ShowProfileService;
