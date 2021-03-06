import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // must be after express
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

// global exception handle must be after routes
app.use((err: any, request: Request, response: Response, _: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: err,
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
