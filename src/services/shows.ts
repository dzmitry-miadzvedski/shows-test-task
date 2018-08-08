import { NodeCache } from 'node-cache';

import { ShowsConfig } from '../config/interfaces';
import { Show, ShowModel } from '../models/interfaces';

import { BadRequestError } from '../errors';

class ShowsService {
  private itemsOnPage: number;

  private showModel: ShowModel;

  private cache: NodeCache;

  constructor(config: ShowsConfig, showModel: ShowModel, cache: NodeCache) {
    this.showModel = showModel;
    this.itemsOnPage = config.itemsOnPage;
    this.cache = cache;
  }

  public async getByPage(page: number): Promise<Show[]> {
    const { itemsOnPage } = this;
    const count = await this.showModel.estimatedDocumentCount();
    const pages = Math.ceil(count / itemsOnPage);

    if (page < 1 || page > pages) {
      throw new BadRequestError('Page is not valid');
    }

    const cachedItems = this.cache.get<Show[]>(page);

    if (cachedItems) {
      return cachedItems;
    }

    const data = await this.showModel.findByInterval((page - 1) * itemsOnPage, page * itemsOnPage);

    const items = data.map((item) => ({
      id: item.id,
      name: item.name,
      cast: item.cast.map((cast) => ({ id: cast.id, name: cast.name, birthday: cast.birthday }))
    }));

    this.cache.set<Show[]>(page, items);

    return items;
  }

  public async save(show: Show): Promise<void> {
    await this.showModel.createItemOrUpdate(show);
  }
}

export default ShowsService;
