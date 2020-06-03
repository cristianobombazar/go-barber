import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.user.id;
    const service = container.resolve(ShowProfileService);
    const user = await service.execute({ userId });
    delete user.password;
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const service = container.resolve(UpdateProfileService);
    const user = await service.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });
    delete user.password;
    return response.json(user);
  }
}
