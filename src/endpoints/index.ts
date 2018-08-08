import { Endpoint } from './interfaces';

import shows from './shows';

async function initialize(): Promise<Endpoint[]> {
  return shows;
}

export default initialize;
