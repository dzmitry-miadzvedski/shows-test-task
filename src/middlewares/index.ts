import Context from '../common/interfaces/Context';
import { Middleware } from './interfaces';

import errorMiddlewareFactory from './error';
import missMiddlewareFactory from './miss';

async function initialize(context: Context): Promise<Middleware[]> {
  return [
    null,
    missMiddlewareFactory(context),
    errorMiddlewareFactory(context)
  ];
}

export default initialize;
