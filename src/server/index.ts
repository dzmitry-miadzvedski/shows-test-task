import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { LoggerInstance } from 'winston';

import Context from '../common/interfaces/Context';
import Router from '../common/interfaces/Router';
import { Endpoint } from '../endpoints/interfaces';

import config from '../config';

import endpointsInitializer from '../endpoints';
import middlewaresInitializer from '../middlewares';
import servicesInitializer from '../services';

async function handle(endpoint: Endpoint, context: Context, request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await endpoint.handler(request, response, context);
  } catch (error) {
    next(error);
  }
}

function applyEndpoint(context: Context, router: Router, endpoint: Endpoint): void {
  const { method, path } = endpoint;

  router[method](path, handle.bind(null, endpoint, context));
}

async function start(logger: LoggerInstance): Promise<Application> {
  const application = express();
  const router = express.Router();

  application.set('port', config.port);

  application.disable('x-powered-by');

  application.use(helmet.xssFilter());
  application.use(helmet.noSniff());
  application.use(helmet.frameguard());

  const services = await servicesInitializer(config);

  const context = {
    config,
    logger,
    services
  };

  const endpoints = await endpointsInitializer();
  const middlewares = await middlewaresInitializer(context);

  endpoints
    .forEach((endpoint) => applyEndpoint(context, router, endpoint));

  middlewares
    .map((middleware) => middleware || router)
    .forEach((middleware) => application.use(middleware));

  return application;
}

export default {
  start
};
