/**
 * Author: SyntaxErrorLineNULL.
 */
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    login: string;
    @IsEmail()
    email: string;
    password: string;
}

export class SignInDto {
    login?: string;
    @IsEmail()
    @IsOptional({ always: false })
    email?: string;
    password: string;
}
