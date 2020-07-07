import ProfileController from '@modules/users/infra/http/controller/ProfileController';
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

const profileRouter = Router();
const controller = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', controller.findById);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
      oldPassword: Joi.string(),
    },
  }),
  controller.update
);

export default profileRouter;
