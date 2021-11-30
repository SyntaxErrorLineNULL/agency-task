/**
 * Author: SyntaxErrorLineNULL.
 */

import { JsonController, Get, QueryParams } from 'routing-controllers';
import { Service } from 'typedi';
import axios from 'axios';
import Album, { IAlbum } from '../module/album/schema/album.schema';
import User, { IUser } from '../module/user/schema/user.schema';
import Photo, { IPhoto } from '../module/photo/schema/photo.schema';
import { PhotoQuery } from './photo.query';
import { PhotoDto } from './model.dto';
import { ModelMapper } from './model.mapper';

@JsonController('')
@Service()
export class PhotoController {
    constructor(private mapper: ModelMapper) {}

    @Get('/load-photos')
    async loadPhoto(): Promise<string> {
        const user: IUser = await User.findById('61a5e478d051076645fadf64');
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

    @Get('/get-photos')
    async getPhoto(@QueryParams() query: PhotoQuery): Promise<PhotoDto[]> {
        try {
            const user: IUser = await User.findById('61a5e478d051076645fadf64');
            const data: IPhoto[] = await Photo.find({ owner: user._id })
                .skip((query.page * query.maxCount));
            return await Promise.all(data.slice(0, query.maxCount).map((photo: IPhoto) => this.mapper.photoMap(photo)));
        } catch (e) {
            console.log(e);
        }
    }
}
