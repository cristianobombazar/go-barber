import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dto/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(dto: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
