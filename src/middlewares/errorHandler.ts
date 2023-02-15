import { NextFunction, Request, Response } from 'express';
import { HttpException } from './index';

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.status = error.status;
  res.locals.message = error.message;
  res.locals.data = {};

  return next();
};

export default errorHandler;