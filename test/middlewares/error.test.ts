import { NextFunction, Request, Response } from 'express';
import { LoggerInstance } from 'winston';

import Context from '../../src/common/interfaces/Context';

import { NotFoundError } from '../../src/errors';

import error from '../../src/middlewares/error';

import getLogger from '../../src/logger';

describe('Middlewares :: error', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let context: Partial<Context>;
  let next: NextFunction;
  let logger: LoggerInstance;

  beforeEach(() => {
    request = {};

    response = {
      status() { return this; },
      json() { return this; },
      end() { return; }
    };

    logger = getLogger();

    context = {
      logger
    };

    next = jest.fn();
    logger.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call logger', () => {
    const errorInstance = new Error('test');

    error(context as Context)(errorInstance, request as Request, response as Response, next);

    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should call status with 503 error', () => {
    response.status = jest.fn().mockReturnValue({ json() { return { end() { return; } }; } });

    const errorInstance = new Error('test');

    error(context as Context)(errorInstance, request as Request, response as Response, next);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toBeCalledWith(503);
  });

  it('should call json', () => {
    response.json = jest.fn().mockReturnValue({ end() { return; } });

    const errorInstance = new Error('test');

    error(context as Context)(errorInstance, request as Request, response as Response, next);

    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('should call end', () => {
    response.end = jest.fn();

    const errorInstance = new Error('test');

    error(context as Context)(errorInstance, request as Request, response as Response, next);

    expect(response.end).toHaveBeenCalledTimes(1);
  });

  it('should call status with status from error', () => {
    response.status = jest.fn().mockReturnValue({ json() { return { end() { return; } }; } });

    const errorInstance = new NotFoundError('not found');

    error(context as Context)(errorInstance, request as Request, response as Response, next);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toBeCalledWith(404);
  });

  it('should call json with message from error', () => {
    const errorMessage = 'not found';

    response.json = jest.fn().mockReturnValue({ end() { return; } });

    const errorInstance = new NotFoundError(errorMessage);

    error(context as Context)(errorInstance, request as Request, response as Response, next);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toBeCalledWith({ message: errorMessage });
  });
});
