import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let service: ListProviderAppointmentsService;
let repository: FakeAppointmentsRepository;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    repository = new FakeAppointmentsRepository();
    service = new ListProviderAppointmentsService(repository);
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
