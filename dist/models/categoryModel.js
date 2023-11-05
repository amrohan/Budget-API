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
exports.getCategoriesByUserId = exports.deleteCategoryById = exports.updateCategoryById = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const db = __importStar(require("../db"));
const mongodb_1 = require("mongodb");
const getAllCategories = () => {
    return db.get().collection('categories').find({}).toArray();
};
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => {
    return db.get().collection('categories').findOne({ _id: new mongodb_1.ObjectId(id) });
};
exports.getCategoryById = getCategoryById;
const createCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('categories').insertOne(category);
    return category;
});
exports.createCategory = createCategory;
const updateCategoryById = (id, category) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('categories').updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: category });
    return category;
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db.get().collection('categories').deleteOne({ _id: new mongodb_1.ObjectId(id) });
    return null;
});
exports.deleteCategoryById = deleteCategoryById;
const getCategoriesByUserId = (userId) => {
    return db.get().collection('categories').find({ userId: userId }).toArray();
};
exports.getCategoriesByUserId = getCategoriesByUserId;
//# sourceMappingURL=categoryModel.js.map