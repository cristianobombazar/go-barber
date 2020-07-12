import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );
    const userId = request.user.id;
    const { providerId, date } = request.body;

    const appointment = await createAppointmentService.execute({
      providerId,
      date,
      userId,
    });
    return response.json(appointment);
  }
}
