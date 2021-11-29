/**
 * Author: SyntaxErrorLineNULL.
 */

import express from 'express';
import { Action, useContainer, useExpressServer } from 'routing-controllers';

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    public async createExpressServer(port: number) {
        useExpressServer(this.app, {
            controllers: [],
        });
        this.app.listen(port, () => console.log(`Running on port ${port}`));
    }
}