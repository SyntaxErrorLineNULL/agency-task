/**
 * Author: SyntaxErrorLineNULL.
 */

import { Service } from 'typedi';
import { AlbumDto, PhotoDto, UserDto } from "./model.dto";
import Album, { IAlbum } from '../module/album/schema/album.schema';
import { IPhoto } from '../module/photo/schema/photo.schema';
import User, { IUser } from '../module/user/schema/user.schema';

@Service()
export class ModelMapper {

    public async photoMap(schema: IPhoto): Promise<PhotoDto> {
        const album: IAlbum = await Album.findById(schema.albumId);
        const user: IUser = await User.findById(schema.owner);
        return {
            id: schema.id,
            albumId: await this.albumMap(album),
            title: schema.title,
            url: schema.url,
            thumbnailUrl: schema.url,
            owner: await this.userMap(user),
        };
    }

    public async albumMap(schema: IAlbum): Promise<AlbumDto> {
        return {
            id: schema.id,
            title: schema.title,
        };
    }

    public async userMap(schema: IUser): Promise<UserDto> {
        return {
            id: schema._id.toString(),
            login: schema.login,
            email: schema.email,
        };
    }
}
