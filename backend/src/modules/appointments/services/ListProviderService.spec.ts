import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let repository: FakeUsersRepository;
let service: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    service = new ListProviderService(repository, fakeCacheProvider);
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
