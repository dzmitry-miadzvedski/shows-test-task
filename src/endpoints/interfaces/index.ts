import { Request, Response } from 'express';

import Context from '../../common/interfaces/Context';

type Handler = (request: Request, response: Response, context: Context) => Promise<void>;

interface Endpoint {
  method: string;
  path: string;
  handler: Handler;
}

export { Handler, Endpoint };
