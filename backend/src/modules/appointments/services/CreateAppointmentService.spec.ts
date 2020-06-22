import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeNotificationRepository: FakeNotificationsRepository;
let repository: FakeAppointmentRepository;
let service: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    repository = new FakeAppointmentRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();
    service = new CreateAppointmentService(
      repository,
      fakeNotificationRepository
    );
  });

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await service.execute({
      date: new Date(2020, 4, 10, 13),
      providerId: '1',
      userId: '2',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('1');
  });

  it('Should not be able to create a new appointment in the same date and time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 16);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await service.execute({
      date: appointmentDate,
      providerId: '1',
      userId: '2',
    });

    await expect(
      service.execute({
        date: appointmentDate,
        providerId: '1',
        userId: '1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      service.execute({
        date: new Date(2020, 4, 10, 11),
        providerId: '1',
        userId: '2',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment for the user itself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      service.execute({
        date: new Date(2020, 4, 10, 11),
        providerId: '1',
        userId: '1',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment outside working hours (8pm - 5pm)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      service.execute({
        date: new Date(2020, 4, 11, 7),
        providerId: '1',
        userId: '2',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      service.execute({
        date: new Date(2020, 4, 11, 18),
        providerId: '1',
        userId: '2',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
