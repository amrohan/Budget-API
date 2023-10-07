import express from "express";
import { connect } from "./db";
import 'dotenv/config';
import * as transactionController from './controllers/transactionController';

const app = express();

app.get('/transactions', transactionController.all)
const startServer = async () => {
    await connect(process.env.MONGO_URL!, process.env.MongoDbName!)

    app.listen(
        3000, () => {
            console.log('Api is started');
        }
    )
}

startServer()