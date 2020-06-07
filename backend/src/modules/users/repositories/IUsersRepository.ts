import IFindAllProvidersDTO from '@modules/users/dto/IFindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';

export default interface IUsersRepository {
  findAllProviders(criteria: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(dto: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
