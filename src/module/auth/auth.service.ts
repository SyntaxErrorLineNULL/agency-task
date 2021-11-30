/**
 * Author: SyntaxErrorLineNULL.
 */

import User, { IUser } from '../user/schema/user.schema';
import { AuthorizationException } from './exceptions';
import jwt from 'jsonwebtoken';
import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { SignInDto } from '../../controller/auth.dto';

@Service()
export class AuthService {

    public async login(body: SignInDto): Promise<{ bearerToken: string, userId: string }> {
        const user: IUser = await User.findOne({ $or: [{ email: body.email }, { login: body.login }] });
        if (!user) throw AuthorizationException.wrongCredentials();
        const passwordIsValid = await bcrypt.compare(body.password, user.password);
        if (!passwordIsValid) throw AuthorizationException.wrongCredentials();
        return await this.sign(user._id.toString());
    }

    public async sign(id: string): Promise<{ bearerToken: string, userId: string }> {
        const token = jwt.sign({ userId: id }, 'Secret');
        return { bearerToken: token, userId: id };
    }
}
