import { Router } from 'express';
import appoimentsRouter from './appointments.routes';

const routes = Router();
routes.use('/appoiments', appoimentsRouter);

export default routes;
