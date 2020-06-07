import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dto/ICreateUserDTO';
import User from '../entities/User';
import IFindAllProvidersDTO from '@modules/users/dto/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
    });
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async create(dto: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(dto);
    await this.repository.save(user);
    return user;
  }

  public async findAllProviders(
    criteria: IFindAllProvidersDTO
  ): Promise<User[]> {
    let users: User[];
    if (criteria && criteria.exceptUserId) {
      users = await this.repository.find({
        where: {
          id: Not(criteria.exceptUserId),
        },
      });
    } else {
      users = await this.repository.find();
    }
    return users;
  }
}

export default UsersRepository;
