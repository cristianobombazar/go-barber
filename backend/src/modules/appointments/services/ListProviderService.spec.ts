import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';

let repository: FakeUsersRepository;
let service: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    service = new ListProviderService(repository);
  });

  it('Should be able show all providers', async () => {
    const user1 = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await repository.create({
      name: 'John Tre',
      email: 'johnTrê@example.com',
      password: '123456',
    });

    const loggedUser = await repository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await service.execute({
      userId: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
