import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import {classToClass} from 'class-transformer';

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
    private repository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(request: IRequest): Promise<Appointment[]> {
    const { providerId, year, month, day } = request;
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;
    let appointments = null; // await this.cacheProvider.get<Appointment[]>(cacheKey);
    if (!appointments) {
      appointments = await this.repository.findByAllInDayFromProvider({
        providerId,
        year,
        month,
        day,
      });
      if (appointments) {
        appointments = classToClass(appointments);
      }
      await this.cacheProvider.save(cacheKey, appointments);
    }
    return appointments;
  }
}
export default ListProviderAppointmentsService;
