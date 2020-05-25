import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const repository = new FakeAppointmentRepository();
    const service = new CreateAppointmentService(repository);

    const appointment = await service.execute({
      date: new Date(),
      providerId: '1',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('1');
  });

  it('Should not be able to create a new appointment in the same date and time', async () => {
    const repository = new FakeAppointmentRepository();
    const service = new CreateAppointmentService(repository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await service.execute({
      date: appointmentDate,
      providerId: '1',
    });

    expect(
      service.execute({
        date: appointmentDate,
        providerId: '1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
