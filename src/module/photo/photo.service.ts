/**
 * Author: SyntaxErrorLineNULL.
 */

import axios from 'axios';
import { Service } from 'typedi';

@Service()
export class PhotoService {

    public async loadPhoto(): Promise<void> {
        try {
            const { data } = await axios.get('http://jsonplaceholder.typicode.com/photos');
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }
}
