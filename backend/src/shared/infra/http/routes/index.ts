import { Router } from 'express';
import appoimentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRoute from '@modules/users/infra/http/routes/session.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';
import profileRoute from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();
routes.use('/appointments', appoimentsRouter);
routes.use('/users', usersRoute);
routes.use('/session', sessionRoute);
routes.use('/password', passwordRoute);
routes.use('/profile', profileRoute);

export default routes;
