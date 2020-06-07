import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { providerId, month, year } = request;

    const appointments = await this.appointmentsRepository.findByAllInMonthFromProvider(
      {
        providerId,
        month,
        year,
      }
    );
    console.log(appointments);
    return [{ day: 1, available: false }];
  }
}
export default ListProviderMonthAvailabilityService;
