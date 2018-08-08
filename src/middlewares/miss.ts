import { NextFunction, Request, Response } from 'express';

import Context from '../common/interfaces/Context';
import { NotFoundError } from '../errors';

const missMiddlewareFactory = (context: Context) => (request: Request, response: Response, next: NextFunction): void => {
  next(new NotFoundError(`There is no such route ${request.url}`));
};

export default missMiddlewareFactory;
