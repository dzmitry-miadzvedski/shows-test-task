import { Request } from 'express';

import { getPage } from '../../src/endpoints/providers';

import { BadRequestError } from '../../src/errors';

describe('Enpoints :: providers :: getPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 1 if page is not set', () => {
    const request: Partial<Request> = {
      params: {}
    };

    const page = getPage(request as Request);

    expect(page).toBe(1);
  });

  it('should return page if it is valid', () => {
    const request: Partial<Request> = {
      params: { page: '2' }
    };

    const page = getPage(request as Request);

    expect(page).toBe(2);
  });

  it('should throw error if page is not number', () => {
    const request: Partial<Request> = {
      params: { page: 'a789' }
    };

    try {
      getPage(request as Request);

      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });
});
