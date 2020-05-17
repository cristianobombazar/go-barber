import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.repository.findOne({
      where: {
        date,
      },
    });
    return findAppointment;
  }

  public async create(dto: ICreateAppointmentDTO): Promise<Appointment> {
    const { providerId, date } = dto;
    const appointment = this.repository.create({ providerId, date });
    await this.repository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
