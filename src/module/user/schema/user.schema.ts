/**
 * Author: SyntaxErrorLineNULL.
 */

import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
    id: string;
    login: string;
    email: string;
    password: string;
    registerDate: Date;
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: true },
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    registerDate: { type: Date, default: Date.now() }
});

const User: Model<IUser> = model('User', UserSchema);
export default User;