import * as db from "../db";
import { ObjectId } from "mongodb";
import { User, UserCredentialsInput, UserInput } from "../types/user";

export const getAllUsers = (): Promise<User[]> => {
  return db.get().collection("users").find<User>({}).toArray();
};

export const getUserById = (id: string): Promise<User | null> => {
  return db
    .get()
    .collection("users")
    .findOne<User>({ _id: new ObjectId(id) });
};

export const createUser = async (user: UserInput): Promise<UserInput> => {
  await db.get().collection("users").insertOne(user);
  return user;
};

export const updateUserById = async (
  id: string,
  user: UserInput
): Promise<UserInput> => {
  await db
    .get()
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: user });
  return user;
};

export const deleteUserById = async (id: string): Promise<User | null> => {
  await db
    .get()
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return null;
};

// auth
export const registerUser = async (
  user: UserCredentialsInput
): Promise<UserCredentialsInput> => {
  await db.get().collection("users").insertOne(user);
  return user;
};

export const getExistingUser = async (query: {
  username?: string;
  email?: string;
}): Promise<User> => {
  const user = await db.get().collection("users").findOne<User>(query);
  return user;
};
