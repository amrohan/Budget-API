import * as Transactions from '../models/transactionsModel';
import { DateTime } from "luxon";
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';

export const all = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.all();
        res.json(doc);
    } catch (error) {
        next()
    }
}

export const getTransactionByTransactionId = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.getTransactionByTransactionId(req.params.id);
        res.json(doc);
    } catch (error) {
        next()
    }
}

export const getTransactionsByUserId = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.getTransactionsByUserId(req.params.userId);
        res.json(doc);
    } catch (error) {
        next()
    }
}

export const getTransactionByMonthandYear = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        // get headers from users
        let timezone = req.headers['timezone'] as string;
        let totalExpense = 0;
        let totalIncome = 0;
        const userId = req.params.userId;
        if (!timezone)
            timezone = 'Asia/Kolkata'
        const monthName = req.query.month;
        const year = parseInt(req.query.year as string, 10);

        const monthNamelist: string[] = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const monthIndex = monthNamelist.indexOf(monthName as string);

        if (monthIndex === -1 || isNaN(year)) {
            res.status(400).send({ error: "Invalid month or year" });
            return;
        }

        const startOfMonthIST = DateTime.fromObject({
            year,
            month: monthIndex + 1,
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

        let transaction = await Transactions.getTransactionByMonthandYear(userId, startOfMonthIST.toISO()!, endOfMonthIST.toISO()!);
        transaction.forEach((budget) => {
            if (budget.type === "expense") {
                totalExpense += budget.amount;
            } else if (budget.type === "income") {
                totalIncome += budget.amount;
            }
        });

        res.status(200).send({ transaction, totalExpense, totalIncome });

    } catch (error) {

    }
}

export const create = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.create(req.body);
        res.json(doc);
    } catch (error) {
        next()
    }
}

export const updateByTransactionId = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.updateByTransactionId(req.params.id, req.body);
        res.json(doc);
    } catch (error) {
        next()
    }
}

export const deleteByTransactionId = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const doc = await Transactions.deleteByTransactionId(req.params.id);
        res.json(doc);
    } catch (error) {
        next()
    }
}

