import * as Accounts from '../models/accountsModel';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';

export const getAllAccounts = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const accounts = await Accounts.getAllAccounts();
        res.json(accounts);
    } catch (error) {
        next(error);
    }
}

export const getAccountById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const accountId = req.params.id;
        const account = await Accounts.getAccountById(accountId);
        res.json(account);
    } catch (error) {
        next(error);
    }
}

export const getAccountsByUserId = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const accounts = await Accounts.getAccountsByUserId(userId);
        res.json(accounts);
    } catch (error) {
        next(error);
    }
}

export const createAccount = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const newAccount = req.body;
        const createdAccount = await Accounts.createAccount(newAccount);
        res.json(createdAccount);
    } catch (error) {
        next(error);
    }
}

export const updateAccountById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const accountId = req.params.id;
        const updatedAccount = await Accounts.updateAccountById(accountId, req.body);
        res.json(updatedAccount);
    } catch (error) {
        next(error);
    }
}

export const deleteAccountById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const accountId = req.params.id;
        await Accounts.deleteAccountById(accountId);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        next(error);
    }
}
