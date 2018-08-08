import { Show } from '../../models/interfaces';

interface DatabaseService {
  connect(): void;
}

interface ShowsService {
  getByPage(page: number): Promise<Show[]>;
  save(show: Show): Promise<void>;
}

export {
  DatabaseService,
  ShowsService
};
