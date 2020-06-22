import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository
  ) {}

  public async execute(request: IRequest): Promise<Appointment[]> {
    const { providerId, year, month, day } = request;
    const appointments = await this.repository.findByAllInDayFromProvider({
      providerId,
      day,
      year,
      month,
    });
    return appointments;
  }
}
export default ListProviderAppointmentsService;
