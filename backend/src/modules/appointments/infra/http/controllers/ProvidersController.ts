import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.user.id;
    const service = container.resolve(ListProviderService);

    const providers = await service.execute({
      userId,
    });
    return response.json(classToClass(providers));
  }
}
