import express from "express";
import { Router } from "express";
import * as transactionController from "../controllers/transactionController";
import * as accountController from "../controllers/accountController";
import * as categoryController from "../controllers/categoryController";
import * as timezoneController from "../controllers/timezoneController";
import * as userController from "../controllers/userController";

export const api = express.Router();

api.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// Users
api
  .route("/user")
  .get(userController.getAllUsers)
  .post(userController.createUser);
api
  .route("/user/:id")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

// transactions
api
  .route("/transaction")
  .get(transactionController.all)
  .post(transactionController.create);
api
  .route("/transaction/:id")
  .get(transactionController.getTransactionByTransactionId)
  .put(transactionController.updateByTransactionId)
  .delete(transactionController.deleteByTransactionId);
api.get(
  "/transaction/all/:userId",
  transactionController.getTransactionsByUserId
);
api.get(
  "/transaction/user/:userId",
  transactionController.getTransactionByMonthandYear
);

// Accounts
api
  .route("/account")
  .get(accountController.getAllAccounts)
  .post(accountController.createAccount);
api.get("/account/user/:userId", accountController.getAccountsByUserId);
api
  .route("/account/:id")
  .get(accountController.getAccountById)
  .put(accountController.updateAccountById)
  .delete(accountController.deleteAccountById);

// Categories
api
  .route("/categorie")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);
api.get("/categorie/user/:userId", categoryController.getCategoriesByUserId);
api
  .route("/categorie/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById);

// Timezone
api.get("/timezone", timezoneController.getTimeZone);
api.post("/timezone", timezoneController.setTimeZone);
