import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRoute from '@modules/users/infra/http/routes/session.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';
import profileRoute from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoute);
routes.use('/session', sessionRoute);
routes.use('/password', passwordRoute);
routes.use('/profile', profileRoute);
routes.use('/providers', providersRouter);

export default routes;
