import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.user.id;
    const service = container.resolve(ShowProfileService);
    const user = await service.execute({ userId });
    return response.json(classToClass(user));
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
    return response.json(classToClass(user));
  }
}
