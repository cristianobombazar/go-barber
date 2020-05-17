import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const createAppointmentService = new CreateAppointmentService();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);
  const appointment = await createAppointmentService.execute({
    providerId,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
