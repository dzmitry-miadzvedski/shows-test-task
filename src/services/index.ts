import { Config } from '../config/interfaces';

import CacheService from './cache';
import DatabaseService from './database';
import ShowsService from './shows';

import ShowModel from '../models/show';

async function initialize(config: Config) {
  const { cache, database, shows } = config.services;

  const databaseService = new DatabaseService(database);
  const showsService = new ShowsService(shows, ShowModel, new CacheService(cache));

  await databaseService.connect();

  return {
    databaseService,
    showsService
  };
}

export default initialize;
