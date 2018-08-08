import { LoggerInstance } from 'winston';

import { Config } from '../../config/interfaces';
import { DatabaseService, ShowsService } from '../../services/interfaces';

interface Context {
  config: Config;
  logger: LoggerInstance;
  services: {
    databaseService: DatabaseService,
    showsService: ShowsService
  };
}

export default Context;
