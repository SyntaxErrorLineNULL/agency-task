/**
 * Author: SyntaxErrorLineNULL.
 */

import { createParamDecorator } from 'routing-controllers';
import { verify } from 'jsonwebtoken';

export const UserId = (options?: { required?: boolean }) => {
    return createParamDecorator({
        required: options && options.required,
        value: action => {
            const token = getToken(action.request.headers);
            const data = verify(token, 'Secret');
            return data['userId'];
        }
    });
}

const getToken = ({ authorization }) => {
    const [, token]: string = authorization.split(' ');
    return token;
}