import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
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
}

export default AppointmentsRepository;
