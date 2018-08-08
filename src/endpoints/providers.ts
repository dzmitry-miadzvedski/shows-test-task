import { Request } from 'express';
import joi from 'joi';

import { BadRequestError } from '../errors';

function getPage(request: Request): number {
  const { page } = request.params;

  if (!page) {
    return 1;
  }

  const { error, value } = joi.validate(page, joi.number().integer());

  if (error) {
    throw new BadRequestError('Page must be a number');
  }

  return value;
}

export {
  getPage
};
