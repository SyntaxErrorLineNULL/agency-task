/**
 * Author: SyntaxErrorLineNULL.
 */

import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../../user/schema/user.schema';

export interface IAlbum extends Document {
    id: number;
    title: string;
    owner: IUser;
}

const AlbumSchema: Schema = new Schema({
    id: { type: Number },
    title: { type: String },
    owner: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
});

const Album: Model<IAlbum> = model('Album', AlbumSchema);
export default Album;