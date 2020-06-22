import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListProviderAppointmentsService);
    const providerId = request.user.id;
    const { day, month, year } = request.body;

    const appointments = await service.execute({
      providerId,
      day,
      month,
      year,
    });
    return response.json(appointments);
  }
}