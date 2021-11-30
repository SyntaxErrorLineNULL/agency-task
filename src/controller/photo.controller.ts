/**
 * Author: SyntaxErrorLineNULL.
 */

import { JsonController, Get } from 'routing-controllers';
import { PhotoService } from '../module/photo/photo.service';
import { Service } from 'typedi';
import axios from 'axios';
import Album, { IAlbum } from '../module/album/schema/album.schema';
import User, { IUser } from '../module/user/schema/user.schema';
import Photo, { IPhoto } from '../module/photo/schema/photo.schema';

@JsonController('')
@Service()
export class PhotoController {

    @Get('/load-photos')
    async loadPhoto(): Promise<string> {
        const user: IUser = await User.findById('61a5da9b74d312a2641cf06b');
        try {
            const { data } = await axios.get('http://jsonplaceholder.typicode.com/photos');
            for (let i of data) {
                const album: IAlbum = new Album({title: i.title, owner: user});
                await album.save();
                const photo: IPhoto = new Photo({
                    id: i.id,
                    albumId: album,
                    title: i.title,
                    url: i.url,
                    thumbnailUrl: i.thumbnailUrl,
                    owner: user,
                });
                await photo.save();
            }
            return 'success';
        } catch (e) {
            console.log(e);
        }
    }
}
