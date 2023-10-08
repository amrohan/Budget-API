import express from "express";
import { connect } from "./db";
import 'dotenv/config';
import bodyParser from "body-parser";
import * as transactionController from './controllers/transactionController';

const app = express();
app.use(bodyParser.json())

app.get('/transactions', transactionController.all)
app.get('/transactions/:userId', transactionController.getTransactionsByUserId)
app.get('/transactions/user/:userId', transactionController.getTransactionByMonthandYear)
app.post('/transactions', transactionController.create)
app.put('/transactions/:id', transactionController.updateByTransactionId)
app.delete('/transactions/:id', transactionController.deleteByTransactionId)
const startServer = async () => {
    await connect(process.env.MONGO_URL!, process.env.MongoDbName!)

    app.listen(
        3000, () => {
            console.log('Api is started');
        }
    )
}

startServer()