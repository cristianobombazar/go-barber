import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import UsersController from '../controller/UsersController';
import UserAvatarController from '../controller/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const controller = new UsersController();
const avatarController = new UserAvatarController();

usersRouter.post('/', controller.create);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), // avatar is the name of the field that contains the img
  avatarController.update
);

export default usersRouter;
