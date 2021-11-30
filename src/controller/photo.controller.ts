/**
 * Author: SyntaxErrorLineNULL.
 */

import { JsonController, Get } from 'routing-controllers';
import { PhotoService } from '../module/photo/photo.service';
import { Service } from 'typedi';

@JsonController('')
@Service()
export class PhotoController {
    constructor(private photoService: PhotoService) {}

    @Get('/load-photos')
    async loadPhoto(): Promise<any> {
        return await this.photoService.loadPhoto();
    }
}
