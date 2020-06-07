import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {getDate, getDaysInMonth} from 'date-fns';

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
    const daysOfMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayOfMonth = Array.from(
      { length: daysOfMonth },
      (_, index) => index + 1
    );
    const availability = eachDayOfMonth.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });
    return availability;
  }
}
export default ListProviderMonthAvailabilityService;
