import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  public async execute(request: IRequest): Promise<User> {
    const { name, email, password } = request;

    const checkUserExists = await this.repository.findByEmail(email);
    if (checkUserExists) {
      throw AppError.create('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = this.repository.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  }
}

export default CreateUserService;
