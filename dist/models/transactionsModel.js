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
exports.getTransactionByMonthandYear = exports.getTransactionByTransactionId = exports.getTransactionsByUserId = exports.deleteByTransactionId = exports.updateByTransactionId = exports.create = exports.all = void 0;
const db = __importStar(require("../db"));
const mongodb_1 = require("mongodb");
const all = () => {
    return db.get().collection('transactions').find({}).toArray();
};
exports.all = all;
const create = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('transactions').insertOne(transaction);
    return transaction;
});
exports.create = create;
const updateByTransactionId = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('transactions').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: transaction });
    return transaction;
});
exports.updateByTransactionId = updateByTransactionId;
const deleteByTransactionId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('transactions').deleteOne({ _id: new mongodb_1.ObjectId(id) });
    return {};
});
exports.deleteByTransactionId = deleteByTransactionId;
const getTransactionsByUserId = (userId) => {
    return db.get().collection('transactions').find({ userId: userId }).toArray();
};
exports.getTransactionsByUserId = getTransactionsByUserId;
const getTransactionByTransactionId = (id) => {
    return db.get().collection('transactions').findOne({ _id: new mongodb_1.ObjectId(id) });
};
exports.getTransactionByTransactionId = getTransactionByTransactionId;
const getTransactionByMonthandYear = (userId, startOfMonthIST, endOfMonthIST) => __awaiter(void 0, void 0, void 0, function* () {
    return db.get().collection('transactions').find({
        userId,
        date: { $gte: startOfMonthIST, $lte: endOfMonthIST },
    }).sort({ date: -1 }).toArray();
});
exports.getTransactionByMonthandYear = getTransactionByMonthandYear;
//# sourceMappingURL=transactionsModel.js.map