import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';
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
    const { providerId, date, userId } = dto;
    const appointment = this.repository.create({ providerId, date,userId });
    await this.repository.save(appointment);
    return appointment;
  }

  public async findByAllInMonthFromProvider(
    criteria: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]> {
    const parsedMonth = String(criteria.month).padStart(2, '0');
    const findAppointment = await this.repository.find({
      where: {
        providerId: criteria.providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = ${parsedMonth}-${criteria.year}`
        ),
      },
    });
    return findAppointment;
  }

  public async findByAllInDayFromProvider(
    criteria: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]> {
    const parsedMonth = String(criteria.month).padStart(2, '0');
    const parsedDay = String(criteria.day).padStart(2, '0');
    const findAppointment = await this.repository.find({
      where: {
        providerId: criteria.providerId,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${criteria.year}'`
        ),
      },
    });
    return findAppointment;
  }
}

export default AppointmentsRepository;
