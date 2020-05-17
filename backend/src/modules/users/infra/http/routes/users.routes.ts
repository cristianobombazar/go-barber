import { Router, Request, Response } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const service = new CreateUserService();
  const user = await service.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // avatar is the name of the field that contains the img
  async (request: Request, response: Response) => {
    const { id: userId } = request.user;
    const service = new UpdateUserAvatarService();
    const user = await service.execute({
      userId,
      avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  }
);

export default usersRouter;
