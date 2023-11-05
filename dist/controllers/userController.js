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
const Users = __importStar(require("../models/userModel")); // Assuming you have a 'usersModel' module
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users.getAllUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield Users.getUserById(userId);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const createdUser = yield Users.createUser(newUser);
        res.json(createdUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updatedUser = yield Users.updateUserById(userId, req.body);
        res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        yield Users.deleteUserById(userId);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userController.js.map