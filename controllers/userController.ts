import * as Users from '../models/userModel'; // Assuming you have a 'usersModel' module
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';

export const getAllUsers = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const users = await Users.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const user = await Users.getUserById(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const newUser = req.body;
        const createdUser = await Users.createUser(newUser);
        res.json(createdUser);
    } catch (error) {
        next(error);
    }
}

export const updateUserById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const updatedUser = await Users.updateUserById(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const deleteUserById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const userId = req.params.id;
        await Users.deleteUserById(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}
