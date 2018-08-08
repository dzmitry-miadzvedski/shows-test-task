import { NodeCache } from 'node-cache';

import { Show } from '../../src/models/interfaces';
import { ShowsService as IShowService } from '../../src/services/interfaces';

import Model from '../../src/models/show';

import CacheService from '../../src/services/cache';
import ShowsService from '../../src/services/shows';

const config = {
  itemsOnPage: 20
};

describe('Services :: Shows', () => {
  let service: IShowService;

  const show: Show = {
    id: 10,
    name: 'testName',
    cast: []
  };

  const secondShow: Show = {
    id: 11,
    name: 'secondShow',
    cast: []
  };

  let cache: NodeCache;

  beforeEach(() => {
    cache = new CacheService();

    service = new ShowsService(
      config,
      Model,
      cache
    );
  });

  describe('save', () => {
    beforeEach(() => {
      Model.createItemOrUpdate = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should save data to database', async () => {
      await service.save(show);

      expect(Model.createItemOrUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByPage', () => {
    const itemsInDatabase = 10;

    beforeEach(() => {
      Model.estimatedDocumentCount = jest.fn().mockReturnValue(itemsInDatabase);
      Model.findByInterval = jest.fn().mockReturnValue([secondShow]);

      cache.set = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should get count of items', async () => {
      cache.get = jest.fn().mockReturnValue([show]);

      await service.getByPage(1);

      expect(Model.estimatedDocumentCount).toHaveBeenCalledTimes(1);
    });

    it('should get result from cache', async () => {
      cache.get = jest.fn().mockReturnValue([show]);

      await service.getByPage(1);

      expect(cache.get).toHaveBeenCalledTimes(1);
    });

    it('should return result from cache', async () => {
      cache.get = jest.fn().mockReturnValue([show]);

      const result = await service.getByPage(1);

      expect(result).toEqual([show]);
    });

    it('should not make call to database if cache is not empty', async () => {
      cache.get = jest.fn().mockReturnValue([show]);

      await service.getByPage(1);

      expect(Model.findByInterval).toHaveBeenCalledTimes(0);
    });

    it('should get data from database if cache is empty', async () => {
      cache.get = jest.fn().mockReturnValue(undefined);

      await service.getByPage(1);

      expect(Model.findByInterval).toHaveBeenCalledTimes(1);
    });

    it('should request data from database with corresponding arguments', async () => {
      cache.get = jest.fn().mockReturnValue(undefined);

      await service.getByPage(1);

      expect(Model.findByInterval).toBeCalledWith(0, config.itemsOnPage);
    });

    it('should set data to cache', async () => {
      cache.get = jest.fn().mockReturnValue(undefined);

      await service.getByPage(1);

      expect(cache.set).toHaveBeenCalledTimes(1);
    });

    it('should return value from database', async () => {
      cache.get = jest.fn().mockReturnValue(undefined);

      const result = await service.getByPage(1);

      expect(result).toEqual([secondShow]);
    });
  });
});
