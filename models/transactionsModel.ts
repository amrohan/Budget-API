import { transaction, transactionInput } from "../types/transaction";
import * as db from '../db'
import { ObjectId } from "mongodb";

export const all = (): Promise<transaction[]> => {
  return db.get().collection('transactions').find<transaction>({}).toArray()
}

export const create = async (transaction: transactionInput): Promise<transactionInput> => {
  await db.get().collection('transactions').insertOne(transaction)
  return transaction as transactionInput
}

export const updateByTransactionId = async (id: string, transaction: transactionInput): Promise<transactionInput> => {
  await db.get().collection('transactions').updateOne({ _id: new ObjectId(id) }, { $set: transaction })
  return transaction as transactionInput
}

export const deleteByTransactionId = async (id: string): Promise<transaction | null> => {
  await db.get().collection('transactions').deleteOne({ _id: new ObjectId(id) })
  return {} as transaction
}

export const getTransactionsByUserId = (userId: string): Promise<transaction[] | null> => {
  return db.get().collection('transactions').find<transaction>({ userId: userId }).toArray()
}

export const getTransactionByTransactionId = (id: string): Promise<transaction | null> => {
  return db.get().collection('transactions').findOne<transaction>({ _id: new ObjectId(id) })
}

export const getTransactionByMonthandYear = async (userId: string, startOfMonthIST: string, endOfMonthIST: string): Promise<transaction[]> => {
  return db.get().collection('transactions').find<transaction>({
    userId,
    date: { $gte: startOfMonthIST, $lte: endOfMonthIST },
  }).sort({ date: -1 }).toArray()
}