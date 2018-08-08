import { Request, Response } from 'express';

import Context from '../common/interfaces/Context';

import { getPage } from './providers';

async function get(request: Request, response: Response, context: Context): Promise<void> {
  const { showsService } = context.services;
  const page = getPage(request);

  const result = await showsService.getByPage(page);

  response.status(200).json(result).end();
}

export default [
  {
    method: 'get',
    path: '/shows',
    handler: get
  },
  {
    method: 'get',
    path: '/shows/page/:page',
    handler: get
  }
];
