import 'dotenv/config';

//dotenv.config({path: './env'});
import  db  from './db/db.js';
import express from 'express';


const port = process.env.PORT || 5000;
const app = express();

db();
