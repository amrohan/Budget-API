"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const transactionController = __importStar(require("./controllers/transactionController"));
const accountController = __importStar(require("./controllers/accountController"));
const categoryController = __importStar(require("./controllers/categoryController"));
const timezoneController = __importStar(require("./controllers/timezoneController"));
const userController = __importStar(require("./controllers/userController"));
const middleware_1 = require("./helpers/middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello Buddy');
});
app.use(body_parser_1.default.json(), (0, cookie_parser_1.default)(), (0, cors_1.default)(), middleware_1.authMiddleware, (req, res, next) => {
    // console.log(`${req.method} - ${req.url}`);
    console.log("Request Made");
    next();
});
// Users
app.route('/users').get(userController.getAllUsers).post(userController.createUser);
app.route('/users/:id').get(userController.getUserById).put(userController.updateUserById).delete(userController.deleteUserById);
// transactions
app.route('/transactions').get(transactionController.all).post(transactionController.create);
app.route('/transactions/:id').get(transactionController.getTransactionByTransactionId).put(transactionController.updateByTransactionId).delete(transactionController.deleteByTransactionId);
app.get('/transactions/all/:userId', transactionController.getTransactionsByUserId);
app.get('/transactions/user/:userId', transactionController.getTransactionByMonthandYear);
// Accounts 
app.route('/accounts').get(accountController.getAllAccounts).post(accountController.createAccount);
app.get('/accounts/user/:userId', accountController.getAccountsByUserId);
app.route('/accounts/:id').get(accountController.getAccountById).put(accountController.updateAccountById).delete(accountController.deleteAccountById);
// Categories
app.route('/categories').get(categoryController.getAllCategories).post(categoryController.createCategory);
app.get('/categories/user/:userId', categoryController.getCategoriesByUserId);
app.route('/categories/:id').get(categoryController.getCategoryById).put(categoryController.updateCategoryById).delete(categoryController.deleteCategoryById);
// Timezone
app.get('/timezone', timezoneController.getTimeZone);
app.post('/timezone', timezoneController.setTimeZone);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connect)(process.env.MONGO_URL, process.env.MongoDbName);
    app.listen(PORT, () => {
        console.log('Api is started');
    });
});
startServer();
//# sourceMappingURL=index.js.map