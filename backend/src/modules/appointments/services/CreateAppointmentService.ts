import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  private repository: AppointmentsRepository;

  public async execute(request: Request): Promise<Appointment> {
    this.repository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(request.date);

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate) {
      throw AppError.create('This appointment is already booked');
    }
    const appointment = this.repository.create({
      providerId: request.providerId,
      date: appointmentDate,
    });
    await this.repository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
