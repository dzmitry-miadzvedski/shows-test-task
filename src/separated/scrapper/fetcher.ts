import fetch from 'node-fetch';
import url from 'url';

import { Cast, Show } from '../../models/interfaces';

class Fetcher {
  private url: string;

  constructor(baseUrl: string) {
    this.url = baseUrl;
  }

  public async getShows(page: number): Promise<Show[]> {
    const data = await this.getData(`shows?page=${page}`);

    return data.map((item: Show) => ({ id: item.id, name: item.name }));
  }

  public async getCast(show: Show): Promise<Cast[]> {
    const data = await this.getData(`shows/${show.id}/cast`);

    return data
      .map(({ person }: { person: Cast }) => ({ id: person.id, name: person.name, birthday: person.birthday }))
      .sort((first: Cast, second: Cast) => {
        if (first.birthday === null) {
          return 1;
        }

        if (second.birthday === null) {
          return -1;
        }

        return new Date(second.birthday) > new Date(first.birthday) ? -1 : 1;
      });
  }

  private async getData(path: string) {
    const response = await fetch(url.resolve(this.url, path));
    const data = await response.json();

    if (!(response.status >= 200 && response.status <= 299)) {
      throw data;
    }

    return data;
  }
}

export default Fetcher;
