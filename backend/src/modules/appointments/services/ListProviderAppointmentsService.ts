import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    const cacheData = await this.cacheProvider.get('asd');
    console.log(cacheData);
    const appointments = await this.repository.findByAllInDayFromProvider({
      providerId,
      day,
      year,
      month,
    });
    await this.cacheProvider.save('asd', 'asd');
    return appointments;
  }
}
export default ListProviderAppointmentsService;
