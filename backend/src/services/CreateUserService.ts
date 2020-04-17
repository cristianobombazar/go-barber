import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(request: Request): Promise<User> {
    const { name, email, password } = request;
    const repository = getRepository(User);

    const checkUserExists = await repository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);
    const user = repository.create({
      name,
      email,
      password: hashedPassword,
    });
    const userSaved = await repository.save(user);
    return userSaved;
  }
}

export default CreateUserService;
