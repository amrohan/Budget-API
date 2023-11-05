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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountById = exports.updateAccountById = exports.createAccount = exports.getAccountsByUserId = exports.getAccountById = exports.getAllAccounts = void 0;
const Accounts = __importStar(require("../models/accountsModel"));
const getAllAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield Accounts.getAllAccounts();
        res.json(accounts);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAccounts = getAllAccounts;
const getAccountById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.params.id;
        const account = yield Accounts.getAccountById(accountId);
        res.json(account);
    }
    catch (error) {
        next(error);
    }
});
exports.getAccountById = getAccountById;
const getAccountsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const accounts = yield Accounts.getAccountsByUserId(userId);
        res.json(accounts);
    }
    catch (error) {
        next(error);
    }
});
exports.getAccountsByUserId = getAccountsByUserId;
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccount = req.body;
        const createdAccount = yield Accounts.createAccount(newAccount);
        res.json(createdAccount);
    }
    catch (error) {
        next(error);
    }
});
exports.createAccount = createAccount;
const updateAccountById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.params.id;
        const updatedAccount = yield Accounts.updateAccountById(accountId, req.body);
        res.json(updatedAccount);
    }
    catch (error) {
        next(error);
    }
});
exports.updateAccountById = updateAccountById;
const deleteAccountById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountId = req.params.id;
        yield Accounts.deleteAccountById(accountId);
        res.json({ message: 'Account deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAccountById = deleteAccountById;
//# sourceMappingURL=accountController.js.map