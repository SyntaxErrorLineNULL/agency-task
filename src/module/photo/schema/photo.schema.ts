/**
 * Author: SyntaxErrorLineNULL.
 */

import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../../user/schema/user.schema';
import { IAlbum } from '../../album/schema/album.schema';

export interface IPhoto extends Document {
    id: number;
    albumId: IAlbum;
    title: string;
    url: string;
    thumbnailUrl: string;
    owner: IUser;
}

const PhotoSchema: Schema = new Schema({
    id: { type: Number, required: true },
    albumId: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
    title: { type: String },
    url: { type: String },
    thumbnailUrl: { type: String },
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Photo: Model<IPhoto> = model('Photo', PhotoSchema);
export default Photo;