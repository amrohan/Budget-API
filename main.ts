import express from "express";
import { connect } from "./db";
import 'dotenv/config';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import * as transactionController from './controllers/transactionController';
import * as accountController from './controllers/accountController';
import * as categoryController from './controllers/categoryController';
import * as timezoneController from './controllers/timezoneController';
import * as userController from './controllers/userController';

const app = express();
app.use(bodyParser.json(), cookieParser(), cors());


// Users
app.get('/users', userController.getAllUsers)
app.get('/users/:id', userController.getUserById)
app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUserById)
app.delete('/users/:id', userController.deleteUserById)


// transactions
app.get('/transactions', transactionController.all)
app.get('/transactions/:userId', transactionController.getTransactionsByUserId)
app.get('/transactions/user/:userId', transactionController.getTransactionByMonthandYear)
app.post('/transactions', transactionController.create)
app.put('/transactions/:id', transactionController.updateByTransactionId)
app.delete('/transactions/:id', transactionController.deleteByTransactionId)

// Accounts 
app.get('/accounts', accountController.getAllAccounts)
app.get('/accounts/:id', accountController.getAccountById)
app.get('/accounts/user/:userId', accountController.getAccountsByUserId)
app.post('/accounts', accountController.createAccount)
app.put('/accounts/:id', accountController.updateAccountById)
app.delete('/accounts/:id', accountController.deleteAccountById)

// Categories
app.get('/categories', categoryController.getAllCategories)
app.get('/categories/:id', categoryController.getCategoryById)
app.get('/categories/user/:userId', categoryController.getCategoriesByUserId)
app.post('/categories', categoryController.createCategory)
app.put('/categories/:id', categoryController.updateCategoryById)
app.delete('/categories/:id', categoryController.deleteCategoryById)

// Timezone
app.get('/timezone', timezoneController.getTimeZone)
app.post('/timezone', timezoneController.setTimeZone)

const startServer = async () => {
    await connect(process.env.MONGO_URL!, process.env.MongoDbName!)

    app.listen(
        3000, () => {
            console.log('Api is started');
        }
    )
}

startServer()