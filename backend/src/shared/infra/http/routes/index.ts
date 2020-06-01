import { Router } from 'express';
import appoimentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRoute from '@modules/users/infra/http/routes/session.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/appoiments', appoimentsRouter);
routes.use('/users', usersRoute);
routes.use('/session', sessionRoute);
routes.use('/password', passwordRoute);

export default routes;
