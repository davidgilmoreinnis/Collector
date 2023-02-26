import * as mongoose from 'mongoose';
import { ModificationNote } from '../modules/common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
   title: String,
   artist: String,
   label: String,
   genre: String,
   year: String,
   format: String,
   modification_notes: [ModificationNote]
});

export default mongoose.model('albums', schema);