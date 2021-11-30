/**
 * Author: SyntaxErrorLineNULL.
 */

import User, { IUser } from '../user/schema/user.schema';
import { AuthorizationException } from './exceptions';
import jwt from 'jsonwebtoken';
import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class AuthService {

    public async login(login: string, password: string): Promise<{ bearerToken: string, userId: string }> {
        const user: IUser = await User.findOne({ login });
        if (!user) throw AuthorizationException.wrongCredentials();
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) throw AuthorizationException.wrongCredentials();
        console.log(user._id.toString());
        return await this.sign(user._id.toString());
    }

    private async sign(id: string): Promise<{ bearerToken: string, userId: string }> {
        const token = jwt.sign({ userId: id }, 'Secret');
        return { bearerToken: token, userId: id };
    }
}
