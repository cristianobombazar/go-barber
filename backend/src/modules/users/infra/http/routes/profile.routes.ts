import ProfileController from '@modules/users/infra/http/controller/ProfileController';
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const profileRouter = Router();
const controller = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', controller.findById);
profileRouter.put('/', controller.update);

export default profileRouter;
