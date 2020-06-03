import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute(request: IRequest): Promise<User> {
    const user = await this.repository.findById(request.userId);
    if (!user) {
      throw AppError.create('User not found');
    }

    const userWithUpdatedEmail = await this.repository.findByEmail(
      request.email
    );
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== request.userId) {
      throw AppError.create('Email already taken');
    }
    user.name = request.name;
    user.email = request.email;

    if (request.password && !request.oldPassword) {
      throw AppError.create('Old password was not provided');
    }
    if (request.password && request.oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        request.oldPassword,
        user.password
      );
      if (!checkOldPassword) {
        throw AppError.create('Old password does not match');
      }
      user.password = await this.hashProvider.generateHash(request.password);
    }
    return this.repository.save(user);
  }
}
export default UpdateProfileService;
