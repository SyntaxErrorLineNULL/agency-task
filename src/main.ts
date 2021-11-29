/**
 * Author: SyntaxErrorLineNULL.
 */

import {App} from "./app";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + './env' });

const app = new App();
app.createExpressServer(5000);