import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarServvice from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const service = container.resolve(UpdateUserAvatarServvice);
    const user = await service.execute({
      userId,
      avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  }
}
