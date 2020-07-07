import { format, getHours, isBefore, startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository
  ) {}

  public async execute(request: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(request.date);

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    );
    if (isBefore(appointmentDate, Date.now())) {
      throw AppError.create(`You can't create an appointment on a past date`);
    }
    if (request.userId === request.providerId) {
      throw AppError.create(`You can't create an appointment to yourself`);
    }
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw AppError.create(
        `You can only create appointments between 8pm and 5pm`
      );
    }
    if (findAppointmentInSameDate) {
      throw AppError.create('This appointment is already booked');
    }
    const appointment = await this.repository.create({
      providerId: request.providerId,
      date: appointmentDate,
      userId: request.userId,
    });

    const dateFormatted = format(appointment.date, "dd/MM/yyyy 'at' HH:mm'h'");
    /*
    await this.notificationRepository.create({
      recipientId: request.providerId,
      content: `New appointment on ${dateFormatted}`,
    }); */
    return appointment;
  }
}

export default CreateAppointmentService;
