import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const router = Router();
const providersController = new ProvidersController();
const monthAvailabilityController = new ProviderMonthAvailabilityController();
const dayAvailabilityController = new ProviderDayAvailabilityController();

router.use(ensureAuthenticated);
router.get('/', providersController.findAll);
router.get('/:id/month-availability', monthAvailabilityController.findAll);
router.get('/:id/day-availability', dayAvailabilityController.findAll);

export default router;
