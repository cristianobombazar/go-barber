import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}
@injectable()
class UpdateUserAvatarServvice {
  constructor(
    @inject('UsersRepository') private repository: IUsersRepository
  ) {}

  public async execute(request: IRequest): Promise<User> {
    const user = await this.repository.findById(request.userId);
    if (!user) {
      throw AppError.create('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = request.avatarFileName;
    await this.repository.save(user);
    return user;
  }
}

export default UpdateUserAvatarServvice;
