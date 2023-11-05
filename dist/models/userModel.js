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
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db = __importStar(require("../db"));
const getAllUsers = () => {
    return db.get().collection('users').find({}).toArray();
};
exports.getAllUsers = getAllUsers;
const getUserById = (id) => {
    return db.get().collection('users').findOne({ userId: id });
};
exports.getUserById = getUserById;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('users').insertOne(user);
    return user;
});
exports.createUser = createUser;
const updateUserById = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('users').updateOne({ userId: id }, { $set: user });
    return user;
});
exports.updateUserById = updateUserById;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('users').deleteOne({ userId: id });
    return null;
});
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userModel.js.map