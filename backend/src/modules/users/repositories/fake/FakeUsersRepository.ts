import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(item => item.id === user.id);
    this.users[index] = user;
    return user;
  }

  public async create(dto: ICreateUserDTO): Promise<User> {
    const user = new User();
    user.id = uuid();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    this.users.push(user);
    return user;
  }
}

export default FakeUsersRepository;
