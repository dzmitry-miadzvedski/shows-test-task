import mongoose from 'mongoose';

import { DatabaseService as IDatabaseService } from '../../src/services/interfaces';

import DatabaseService from '../../src/services/database';

const config = {
  url: 'test'
};

describe('Services :: Database', () => {
  let service: IDatabaseService;

  beforeEach(() => {
    service = new DatabaseService(config);
  });

  describe('connect', () => {
    beforeEach(() => {
      mongoose.connect = jest.fn();
      mongoose.connection.on = jest.fn();
      mongoose.connection.once = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should connect', async () => {
      service.connect();

      expect(mongoose.connect).toHaveBeenCalledTimes(1);
    });

    it('should connect with corresponding arguments', async () => {
      service.connect();

      expect(mongoose.connect).toBeCalledWith(config.url, { useNewUrlParser: true });
    });

    it('should listen error event', async () => {
      service.connect();

      expect(mongoose.connection.on).toHaveBeenCalledTimes(1);
      expect(mongoose.connection.on).toBeCalledWith('error', expect.anything());
    });

    it('should listen open event', async () => {
      service.connect();

      expect(mongoose.connection.once).toHaveBeenCalledTimes(1);
      expect(mongoose.connection.once).toBeCalledWith('open', expect.anything());
    });
  });
});
