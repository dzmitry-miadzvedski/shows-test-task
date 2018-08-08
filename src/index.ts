import { Application } from 'express';

import getLogger from './logger';
import server from './server';

function listen(app: Application): Promise<{ port: number }> {
  const port = app.get('port');

  return new Promise((resolve, reject) => {
    app.listen(port, (error: Error) => {
      if (error) {
        reject(error);

        return;
      }

      resolve({ port });
    });
  });
}

async function start() {
  const logger = getLogger();

  try {
    const application = await server.start(logger);
    const { port } = await listen(application);

    logger.info(`Listening at http://localhost:${port}`);
  } catch (error) {
    logger.info(`Start canceled - ${error.stack || error.message}`);
    process.exit(1);
  }
}

start();
