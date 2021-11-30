/**
 * Author: SyntaxErrorLineNULL.
 */

import { Service } from 'typedi';
import { JsonController, Post, Authorized, QueryParams, Delete, Body, Param } from 'routing-controllers';
import Album , { IAlbum } from '../module/album/schema/album.schema';
import Photo, { IPhoto } from '../module/photo/schema/photo.schema';
import { AlbumDeleteQuery } from './photo.query';
import { UserId } from '../module/auth/user.decorator';
import User, { IUser } from '../module/user/schema/user.schema';
import { AlbumChangeTitleDto } from './album.dto';

@JsonController()
@Service()
export class AlbumController {

    @Delete('/delete-album')
    @Authorized()
    async deleteAlbum(@QueryParams() query: AlbumDeleteQuery, @UserId() userId: string): Promise<string> {
        try {
            const user: IUser = await User.findById(userId);
            for (let i of query.albumId.split(',')) {
                const album: IAlbum = await Album.findOne({ id: i, owner: user });
                if (!album) {
                    throw new Error('Альбом не найден');
                }
                const photos: IPhoto[] = await Photo.find({ albumId: album});
                //photos.forEach(value => console.log(value));
                if (!photos) {
                    throw new Error('Фото не найдены');
                }
                await album.deleteOne();
                await photos.forEach((photo => photo.deleteOne()));
            }
            return 'success delete album';
        } catch (e) {
            console.log(e);
        }
    }

    @Post('/change-album-title/:id')
    async changeTitle(@Body() body: AlbumChangeTitleDto, @Param('id') id: number, @UserId() userId: string): Promise<string> {
        try {
            const user: IUser = await User.findById(userId);
            const album: IAlbum = await Album.findOne({ id: id, owner: user });
            if (!album) {
                throw new Error('Альбом не найден');
            }
            album.title = body.new_album_name;
            await album.save();
            return 'success update title';
        } catch (e) {
            console.log(e);
        }
    }
}
