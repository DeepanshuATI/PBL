import * as dotenv from 'dotenv';
dotenv.config();
import { DB } from '../database/database.js';
import express from 'express';

const port = process.env.PORT || 5000;
const app = express();

const server = () => {
    DB()
    app.listen(port,() => {
        console.log(`Port : ${port}`);
    });
}

server();
