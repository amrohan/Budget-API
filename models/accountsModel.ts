import * as db from '../db';
import { ObjectId } from 'mongodb';
import { Account, AccountInput } from '../types/accounts';


export const getAllAccounts = (): Promise<Account[]> => {
    return db.get().collection('accounts').find<Account>({}).toArray();
};

export const getAccountById = (id: string): Promise<Account | null> => {
    return db.get().collection('accounts').findOne<Account>({ _id: new ObjectId(id) });
}

export const createAccount = async (account: AccountInput): Promise<AccountInput> => {
    await db.get().collection('accounts').insertOne(account);
    return account;
};

export const updateAccountById = async (
    id: string,
    account: AccountInput
): Promise<AccountInput> => {
    await db.get().collection('accounts').updateOne({ _id: new ObjectId(id) }, { $set: account });
    return account;
};

export const deleteAccountById = async (id: string): Promise<Account | null> => {
    await db.get().collection('accounts').deleteOne({ _id: new ObjectId(id) });
    return null;
};

export const getAccountsByUserId = (userId: string): Promise<Account[]> => {
    return db.get().collection('accounts').find<Account>({ userId: userId }).toArray();
};
