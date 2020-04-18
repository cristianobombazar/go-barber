import { Router } from 'express';
import appoimentsRouter from './appointments.routes';
import usersRoute from './users.routes';
import sessionRoute from './session.routes';

const routes = Router();
routes.use('/appoiments', appoimentsRouter);
routes.use('/users', usersRoute);
routes.use('/session', sessionRoute);

export default routes;
