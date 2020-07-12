import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let service: ListProviderAppointmentsService;
let repository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    repository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    service = new ListProviderAppointmentsService(
      repository,
      fakeCacheProvider
    );
  });

  it('Should be able to list the appointments on a specific day', async () => {
    const appointment1 = await repository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await repository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const availability = await service.execute({
      providerId: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([appointment1, appointment2])
    );
  });
});
