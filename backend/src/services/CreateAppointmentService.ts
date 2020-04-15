import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private repository: AppointmentsRepository;

  constructor(repository: AppointmentsRepository) {
    this.repository = repository;
  }

  public execute(request: Request): Appointment {
    const appointmentDate = startOfHour(request.date);

    const findAppointmentInSameDate = this.repository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
    const appointment = this.repository.create({
      provider: request.provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
