import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controller/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controller/ResetPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create
);

export default passwordRouter;
