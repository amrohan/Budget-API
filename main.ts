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
app.use(bodyParser.json(), cookieParser(), cors(), (req, res, next) => {
    console.log(`${req.method} - ${req.url} ${req.hostname}`);
    next();
});


// Users
app.route('/users').get(userController.getAllUsers).post(userController.createUser)
app.route('/users/:id').get(userController.getUserById).put(userController.updateUserById).delete(userController.deleteUserById)

// transactions
app.route('/transactions').get(transactionController.all).post(transactionController.create)
app.route('/transactions/:id').put(transactionController.updateByTransactionId).delete(transactionController.deleteByTransactionId)
app.get('/transactions/:userId', transactionController.getTransactionsByUserId)
app.get('/transactions/user/:userId', transactionController.getTransactionByMonthandYear)


// Accounts 
app.route('/accounts').get(accountController.getAllAccounts).post(accountController.createAccount)
app.get('/accounts/user/:userId', accountController.getAccountsByUserId)
app.route('/accounts/:id').get(accountController.getAccountById).put(accountController.updateAccountById).delete(accountController.deleteAccountById)


// Categories
app.route('/categories').get(categoryController.getAllCategories).post(categoryController.createCategory)
app.get('/categories/user/:userId', categoryController.getCategoriesByUserId)
app.route('/categories/:id').get(categoryController.getCategoryById).put(categoryController.updateCategoryById).delete(categoryController.deleteCategoryById)

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