export type Category = {
    _id: string
    userId: string
    categoryName: string
}

export type CategoryInput = Omit<Category, '_id'>