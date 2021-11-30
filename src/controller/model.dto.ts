/**
 * Author: SyntaxErrorLineNULL.
 */

export interface AlbumDto {
    title: string;
}

export interface UserDto {
    id: string;
    login: string;
    email: string;
}

export interface PhotoDto {
    id: number;
    albumId: AlbumDto;
    title: string;
    url: string;
    thumbnailUrl: string;
    owner: UserDto;
}
