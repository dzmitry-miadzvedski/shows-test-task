import { Request, Response } from 'express';

import Context from '../../src/common/interfaces/Context';
import { Show } from '../../src/models/interfaces';

import endpoints from '../../src/endpoints/shows';

const shows: Show[] = [];

const showsServicStub = {
  getByPage(page: number): Promise<Show[]> {
    return Promise.resolve(shows);
  },
  save(show: Show): Promise<void> {
    return Promise.resolve();
  }
};

const databaseServicStub = {
  connect() { return; }
};

describe('Enpoints :: shows', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let context: Partial<Context>;

  beforeEach(() => {
    request = {
      params: {
        page: 2
      }
    };

    response = {
      status() { return this; },
      json() { return this; },
      end() { return; }
    };

    context = {
      services: {
        showsService: showsServicStub,
        databaseService: databaseServicStub
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get items by page', async () => {
    context.services.showsService.getByPage = jest.fn();

    await endpoints[0].handler(request as Request, response as Response, context as Context);

    expect(context.services.showsService.getByPage).toHaveBeenCalledTimes(1);
  });

  it('should set status', async () => {
    response.status = jest.fn().mockReturnValue({ json() { return { end() { return; } }; } });

    await endpoints[0].handler(request as Request, response as Response, context as Context);

    expect(response.status).toHaveBeenCalledTimes(1);
  });

  it('should send json response', async () => {
    response.json = jest.fn().mockReturnValue({ end() { return; } });

    await endpoints[0].handler(request as Request, response as Response, context as Context);

    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('should call end', async () => {
    response.end = jest.fn();

    await endpoints[0].handler(request as Request, response as Response, context as Context);

    expect(response.end).toHaveBeenCalledTimes(1);
  });
});
