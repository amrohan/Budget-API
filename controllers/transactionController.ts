import * as Transactions from '../models/transactionsModel';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';

export const all = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.all();
        res.json(doc);
    } catch (error) {
        next()
    }
}