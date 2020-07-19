import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dto/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(dto: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, providerId: string): Promise<Appointment | undefined>;
  findByAllInMonthFromProvider(
    criteria: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>;
  findByAllInDayFromProvider(
    criteria: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>;
}
