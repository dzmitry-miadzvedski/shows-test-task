import { Router as ExpressRouter } from 'express';

interface Router extends ExpressRouter {
  [key: string]: any;
}

export default Router;
