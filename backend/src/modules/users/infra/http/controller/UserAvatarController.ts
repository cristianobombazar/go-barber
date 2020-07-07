import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {

    const { id: userId } = request.user;
    const service = container.resolve(UpdateUserAvatarService);
    const user = await service.execute({
      userId,
      avatarFileName: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}
