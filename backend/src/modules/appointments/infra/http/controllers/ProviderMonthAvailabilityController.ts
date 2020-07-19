import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const providerId = request.params.id;
    const { month, year } = request.query;
    const service = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await service.execute({
      providerId,
      month: Number(month),
      year: Number(year),
    });
    return response.json(availability);
  }
}
