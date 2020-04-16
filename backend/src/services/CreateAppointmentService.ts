import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
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
      throw Error('This appointment is already booked');
    }
    const appointment = this.repository.create({
      provider: request.provider,
      date: appointmentDate,
    });
    await this.repository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
