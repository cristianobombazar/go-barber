import {startOfHour} from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import {inject, injectable} from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository
  ) {}

  public async execute(request: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(request.date);

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate) {
      throw AppError.create('This appointment is already booked');
    }
    const appointment = await this.repository.create({
      providerId: request.providerId,
      date: appointmentDate,
      userId: request.userId,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
