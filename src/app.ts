/**
 * Author: SyntaxErrorLineNULL.
 */

import express from 'express';
import { Action, useContainer, useExpressServer } from 'routing-controllers';
import { AuthController } from './controller/auth.controller';
import { connect } from 'mongoose';
import 'reflect-metadata';
import { Container } from 'typedi';
import { PhotoController } from './controller/photo.controller';
import { AlbumController } from './controller/album.controller';

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    public async createExpressServer(port: number) {
        try {
            connect('mongodb://127.0.0.1:27017/app',() => console.log('Mongoose is connected'));
        } catch (e) {
            console.log(e);
        }
        useContainer(Container);
        useExpressServer(this.app, {
            controllers: [AuthController, PhotoController, AlbumController],
            authorizationChecker: async (action: Action, roles?: string[]): Promise<boolean> => {
                return true;
            }
        });
        this.app.listen(port, () => console.log(`Running on port ${port}`));
    }
}