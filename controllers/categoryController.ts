import * as Categories from '../models/categoryModel';
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';

export const getAllCategories = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const categories = await Categories.getAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
}
export const getCategoryById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.getCategoryById(categoryId);
        res.json(category);
    } catch (error) {
        next(error);
    }
}

export const getCategoriesByUserId = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const categories = await Categories.getCategoriesByUserId(userId);
        res.json(categories);
    } catch (error) {
        next(error);
    }
}

export const createCategory = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const newCategory = req.body;
        const createdCategory = await Categories.createCategory(newCategory);
        res.json(createdCategory);
    } catch (error) {
        next(error);
    }
}

export const updateCategoryById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        const updatedCategory = await Categories.updateCategoryById(categoryId, req.body);
        res.json(updatedCategory);
    } catch (error) {
        next(error);
    }
}

export const deleteCategoryById = async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        await Categories.deleteCategoryById(categoryId);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
}
