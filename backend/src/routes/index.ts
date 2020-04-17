import { Router } from 'express';
import appoimentsRouter from './appointments.routes';
import usersRoute from './users.routes';

const routes = Router();
routes.use('/appoiments', appoimentsRouter);
routes.use('/users', usersRoute);

export default routes;
