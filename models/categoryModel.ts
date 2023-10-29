import * as db from '../db';
import { ObjectId } from 'mongodb';
import { Category, CategoryInput } from '../types/category';

export const getAllCategories = (): Promise<Category[]> => {
  return db.get().collection('categories').find<Category>({}).toArray();
};

export const getCategoryById = (id: string): Promise<Category | null> => {
  return db.get().collection('categories').findOne<Category>({ _id: new ObjectId(id) });
}


export const createCategory = async (category: CategoryInput): Promise<CategoryInput> => {
  await db.get().collection('categories').insertOne(category);
  return category;
};

export const updateCategoryById = async (
  id: string,
  category: CategoryInput
): Promise<CategoryInput> => {
  await db.get().collection('categories').updateOne({ _id: new ObjectId(id) }, { $set: category });
  return category;
};

export const deleteCategoryById = async (id: string): Promise<Category | null> => {
  await db.get().collection('categories').deleteOne({ _id: new ObjectId(id) });
  return null;
};

export const getCategoriesByUserId = (userId: string): Promise<Category[]> => {
  return db.get().collection('categories').find<Category>({ userId: userId }).toArray();
};
