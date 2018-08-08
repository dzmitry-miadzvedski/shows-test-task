import { Document, Model } from 'mongoose';

interface Cast {
  birthday: string;
  id: number;
  name: string;
}

interface Show {
  cast?: Cast[];
  id: number;
  name: string;
}

interface ShowDb extends Document, Show {
  id: number;
}

interface ShowModel extends Model<ShowDb> {
  findByInterval(from: number, to: number): Promise<ShowDb[]>;
  createItemOrUpdate(show: Show): Promise<ShowDb>;
}

export {
  Cast,
  Show,
  ShowDb,
  ShowModel
};
