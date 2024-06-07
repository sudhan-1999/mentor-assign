import express from 'express';
import { MongoClient } from 'mongodb';
import *  as dotenv from 'dotenv';
import userrouter from './route.js';
dotenv.config();

const app = express()
const port = 8000;
app.use(express.json());

const mongo = process.env.mongo;


async function creatingconnection(){
    const client = new MongoClient(mongo);
    await client.connect();
    console.log("mogodb connected")
    return client
}

export const client = creatingconnection();

app.use("/",userrouter)

app.listen(port,()=>{console.log(`App started at ${port}`)})