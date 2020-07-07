import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    console.log('here 1');
    let createAppointmentService;
    try {
      createAppointmentService = container.resolve(CreateAppointmentService);
    } catch (e) {
      console.log(e);
    }

    console.log('here 2');
    const userId = request.user.id;
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);
    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
      userId,
    });
    return response.json(appointment);
  }
}
