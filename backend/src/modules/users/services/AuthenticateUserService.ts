import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { email, password } = request;
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw AppError.create('Incorret email/password combination', 401);
    }
    const passwordMateched = await compare(password, user.password);
    if (!passwordMateched) {
      throw AppError.create('Incorret email/password combination', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
