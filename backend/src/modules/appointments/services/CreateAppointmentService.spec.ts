import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let repository: FakeAppointmentRepository;
let service: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    repository = new FakeAppointmentRepository();
    service = new CreateAppointmentService(repository);
  });

  it('Should be able to create a new appointment', async () => {
    const appointment = await service.execute({
      date: new Date(),
      providerId: '1',
      userId: '1',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('1');
  });

  it('Should not be able to create a new appointment in the same date and time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await service.execute({
      date: appointmentDate,
      providerId: '1',
      userId: '1',
    });

    await expect(
      service.execute({
        date: appointmentDate,
        providerId: '1',
        userId: '1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
