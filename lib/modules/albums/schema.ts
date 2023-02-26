import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;
const schema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    label: String,
    genre: String,
    year: String,
    format: String,
});

export default mongoose.model('albums', schema);