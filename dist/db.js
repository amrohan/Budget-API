"use strict";
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
exports.get = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const state = { db: null };
const connect = (url, dbname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (state.db)
            return;
        const client = mongodb_1.MongoClient.connect(url);
        yield client;
        state.db = (yield client).db(dbname);
    }
    catch (error) {
        console.log("🚀 ~ file: db.ts:9 ~ connect ~ error:", error);
    }
});
exports.connect = connect;
const get = () => {
    if (!state.db)
        throw new Error('Database not connected');
    return state.db;
};
exports.get = get;
//# sourceMappingURL=db.js.map