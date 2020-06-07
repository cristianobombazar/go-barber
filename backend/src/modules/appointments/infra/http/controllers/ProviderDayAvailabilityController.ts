import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const providerId = request.params.id;
    const { month, year, day } = request.body;
    const service = container.resolve(ListProviderDayAvailabilityService);

    const availability = await service.execute({
      providerId,
      day,
      month,
      year,
    });
    return response.json(availability);
  }
}
