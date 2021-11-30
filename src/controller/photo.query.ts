/**
 * Author: SyntaxErrorLineNULL.
 */
import { IsNumber } from 'class-validator';

export class PhotoQuery {
    ownerId?: string;
    page?: number;
    maxCount?: number;
}

export class PhotoDeleteQuery {
    @IsNumber()
    photoId: number;
}
