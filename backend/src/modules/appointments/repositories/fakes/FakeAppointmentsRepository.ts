import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';
import {isEqual, getMonth, getYear, getDate} from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(item => {
      return isEqual(item.date, date);
    });
  }

  public async create(dto: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    appointment.id = uuid();
    appointment.date = dto.date;
    appointment.providerId = dto.providerId;
    this.appointments.push(appointment);
    return appointment;
  }

  public async findByAllInMonthFromProvider(
    criteria: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]> {
    return this.appointments.filter(item => {
      return (
        item.providerId === criteria.providerId &&
        getMonth(item.date) + 1 === criteria.month &&
        getYear(item.date) === criteria.year
      );
    });
  }

  public async findByAllInDayFromProvider(
    criteria: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]> {
    return this.appointments.filter(item => {
      return (
        item.providerId === criteria.providerId &&
        getMonth(item.date) + 1 === criteria.month &&
        getYear(item.date) === criteria.year &&
        getDate(item.date) === criteria.day
      );
    });
  }
}

export default FakeAppointmentsRepository;
