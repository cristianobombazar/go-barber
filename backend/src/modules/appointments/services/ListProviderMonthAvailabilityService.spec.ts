import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let service: ListProviderMonthAvailabilityService;
let appointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    service = new ListProviderMonthAvailabilityService(appointmentsRepository);
  });

  it('Should be able to list all days available in a month from a provider', async () => {
    await appointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });
    await appointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await appointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await appointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await service.execute({
      providerId: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ])
    );
  });
});
