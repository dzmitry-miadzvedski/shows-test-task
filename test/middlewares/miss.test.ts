import { NextFunction, Request, Response } from 'express';

import Context from '../../src/common/interfaces/Context';

import { NotFoundError } from '../../src/errors';

import miss from '../../src/middlewares/miss';

describe('Middlewares :: miss', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let context: Partial<Context>;
  let next: NextFunction;

  beforeEach(() => {
    request = {};
    response = {};
    context = {};

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next', () => {
    miss(context as Context)(request as Request, response as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next with not found error', () => {
    miss(context as Context)(request as Request, response as Response, next);

    expect(next).toBeCalledWith(expect.any(NotFoundError));
  });
});
