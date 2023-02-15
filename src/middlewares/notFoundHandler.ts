import { NextFunction, Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!res.locals.status && !res.locals.data) {
      res.locals.status = 404;
      res.locals.message = 'Invalid URL';
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export default notFoundHandler;