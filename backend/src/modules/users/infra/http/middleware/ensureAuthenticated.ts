import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authToken = request.headers.authorization;
  if (!authToken) {
    throw AppError.create('JWT token is missing', 401);
  }
  const [, token] = authToken.split(' ');
  const payload = verify(token, authConfig.jwt.secret) as TokenPayload;

  request.user = {
    id: payload.sub,
  };
  return next();
}
