import mongoose from 'mongoose';

import { DatabaseConfig } from '../config/interfaces';
import { DatabaseError } from '../errors';

class DatabaseService {
  private url: string;

  constructor(config: DatabaseConfig) {
    this.url = config.url;
  }

  public connect() {
    mongoose.connect(this.url, { useNewUrlParser: true });

    const db = mongoose.connection;

    return new Promise((resolve, reject) => {
      db.on('error', (error) => {
        reject(new DatabaseError(`Connection error: ${error.message}`));
      });

      db.once('open', () => {
        resolve();
      });
    });
  }
}

export default DatabaseService;
