import { model, Schema } from 'mongoose';

import { Show, ShowDb, ShowModel } from './interfaces';

const ShowSchema = new Schema({
  cast: [{
    birthday: { type: String },
    id: { type: Number },
    name: { type: String },
  }],
  id: { type: Number, unique: true },
  name: { type: String },
});

ShowSchema.static('findByInterval', function(from: number, to: number): Promise<ShowDb[]> {
  return this
    .find()
    .skip(from)
    .limit(to - from)
    .exec();
});

ShowSchema.static('createItemOrUpdate', function(show: Show): Promise<ShowDb> {
  return this
    .findOneAndUpdate(
      { id: show.id },
      { ...show },
      { upsert: true, new: true }
    );
});

const Model: ShowModel = model<ShowDb, ShowModel>('Show', ShowSchema);

export default Model;
