import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarServvice {
  public async execute(request: Request): Promise<User> {
    const repository = getRepository(User);

    const user = await repository.findOne(request.userId);
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
    await repository.save(user);
    return user;
  }
}

export default UpdateUserAvatarServvice;
