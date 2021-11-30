/**
 * Author: SyntaxErrorLineNULL.
 */

import { Body, JsonController, Post } from 'routing-controllers';
import { SignUpDto, SignInDto } from './auth.dto';
import User from '../module/user/schema/user.schema';
import { AuthorizationException } from '../module/auth/exceptions';
import { AuthService } from '../module/auth/auth.service';
import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';
import 'reflect-metadata';

@JsonController()
@Service()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(@Body() body: SignUpDto): Promise<{ bearerToken: string, userId: string }> {
        if (await User.findOne({ email: body.email })) {
            throw new AuthorizationException('Пользователь с таким email уже существует');
        }
        if (await User.findOne({ login: body.login })) {
            throw new AuthorizationException('Пользователь с таким login уже существует');
        }
        const user = new User({
            login: body.login,
            email: body.email,
            password: await bcrypt.hash(body.password, 13),
        });
        await user.save();
        return await this.authService.sign(user._id);
    }

    @Post('/login')
    async login(@Body() body: SignInDto): Promise<{ bearerToken: string, userId: string }> {
        return await this.authService.login(body);
    }
}
