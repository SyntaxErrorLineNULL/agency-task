/**
 * Author: SyntaxErrorLineNULL.
 */

import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
    login: string;
    email: string;
    password: string;
    registerDate: Date;
}

const UserSchema: Schema = new Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    registerDate: { type: Date, default: Date.now() }
});

const User: Model<IUser> = model('User', UserSchema);
export default User;