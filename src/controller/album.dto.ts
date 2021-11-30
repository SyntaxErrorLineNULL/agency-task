/**
 * Author: SyntaxErrorLineNULL.
 */

import { IsNotEmpty } from 'class-validator';

export class AlbumChangeTitleDto {
    @IsNotEmpty()
    new_album_name: string;
}