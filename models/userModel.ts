import * as db from '../db';
import { ObjectId } from 'mongodb';
import { User, UserInput } from '../types/user';

export const getAllUsers = (): Promise<User[]> => {
    return db.get().collection('users').find<User>({}).toArray();
};

export const getUserById = (id: string): Promise<User | null> => {
    return db.get().collection('users').findOne<User>({ userId: id });
};

export const createUser = async (user: UserInput): Promise<UserInput> => {
    await db.get().collection('users').insertOne(user);
    return user;
};

export const updateUserById = async (id: string, user: UserInput): Promise<UserInput> => {
    await db.get().collection('users').updateOne({ userId: id }, { $set: user });
    return user;
};

export const deleteUserById = async (id: string): Promise<User | null> => {
    await db.get().collection('users').deleteOne({ userId: id });
    return null;
};
