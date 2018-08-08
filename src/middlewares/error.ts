import { NextFunction, Request, Response } from 'express';

import Context from '../common/interfaces/Context';
import { Error } from '../errors/interfaces';

const errorMiddlewareFactory = (context: Context) => (error: Error, request: Request, response: Response, next: NextFunction): void => {
  context.logger.error(error.stack || error.message);

  const message = !error.status || error.status === 503
    ? 'Something went wrong'
    : error.message;

  response
    .status(error.status || 503)
    .json({ message })
    .end();
};

export default errorMiddlewareFactory;
