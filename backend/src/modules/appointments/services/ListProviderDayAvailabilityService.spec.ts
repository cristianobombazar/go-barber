import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let service: ListProviderDayAvailabilityService;
let appointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    service = new ListProviderDayAvailabilityService(appointmentsRepository);
  });

  it('Should be able to list the day availability from provider', async () => {
    await appointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });
    await appointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 21, 10, 0, 0),
    });
    const availability = await service.execute({
      providerId: 'user',
      year: 2020,
      month: 5,
      day: 21,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ])
    );
  });
});
