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
exports.deleteByTransactionId = exports.updateByTransactionId = exports.create = exports.getTransactionByMonthandYear = exports.getTransactionsByUserId = exports.getTransactionByTransactionId = exports.all = void 0;
const Transactions = __importStar(require("../models/transactionsModel"));
const luxon_1 = require("luxon");
const all = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Transactions.all();
        res.json(doc);
    }
    catch (error) {
        next();
    }
});
exports.all = all;
const getTransactionByTransactionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Transactions.getTransactionByTransactionId(req.params.id);
        res.json(doc);
    }
    catch (error) {
        next();
    }
});
exports.getTransactionByTransactionId = getTransactionByTransactionId;
const getTransactionsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Transactions.getTransactionsByUserId(req.params.userId);
        res.json(doc);
    }
    catch (error) {
        next();
    }
});
exports.getTransactionsByUserId = getTransactionsByUserId;
const getTransactionByMonthandYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get headers from users
        let timezone = req.headers['timezone'];
        let totalExpense = 0;
        let totalIncome = 0;
        const userId = req.params.userId;
        if (!timezone)
            timezone = 'Asia/Kolkata';
        const monthNumber = parseInt(req.query.month, 10);
        const year = parseInt(req.query.year, 10);
        if (isNaN(monthNumber) || isNaN(year)) {
            res.status(400).send({ error: "Invalid month or year" });
            return;
        }
        const startOfMonthIST = luxon_1.DateTime.fromObject({
            year,
            month: monthNumber,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        }).setZone(timezone);
        const endOfMonthIST = startOfMonthIST
            .plus({ months: 1 })
            .minus({ days: 1 })
            .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
            .setZone(timezone);
        let transaction = yield Transactions.getTransactionByMonthandYear(userId, startOfMonthIST.toISO(), endOfMonthIST.toISO());
        transaction.forEach((budget) => {
            if (budget.type === "expense") {
                totalExpense += budget.amount;
            }
            else if (budget.type === "income") {
                totalIncome += budget.amount;
            }
        });
        res.status(200).send({ transaction, totalExpense, totalIncome });
    }
    catch (error) {
    }
});
exports.getTransactionByMonthandYear = getTransactionByMonthandYear;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Transactions.create(req.body);
        res.json(doc);
    }
    catch (error) {
        next();
    }
});
exports.create = create;
const updateByTransactionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Transactions.updateByTransactionId(req.params.id, req.body);
        res.json(doc);
    }
    catch (error) {
        next();
    }
});
exports.updateByTransactionId = updateByTransactionId;
const deleteByTransactionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Transactions.deleteByTransactionId(req.params.id);
        res.json(doc);
    }
    catch (error) {
        next();
    }
});
exports.deleteByTransactionId = deleteByTransactionId;
//# sourceMappingURL=transactionController.js.map