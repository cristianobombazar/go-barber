import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(dto: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByAllInMonthFromProvider(
    criteria: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>;
}
