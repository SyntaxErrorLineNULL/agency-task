/**
 * Author: SyntaxErrorLineNULL.
 */

export class AuthorizationException extends Error {
    public static wrongCredentials() {
        return new AuthorizationException('Неверный email, логин или пароль');
    }

    public static wrongOwner() {
        return new AuthorizationException('Вы не являетесь владельцем фоторгафии');
    }
}
