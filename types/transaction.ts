export type transaction = {
    _id: string
    title: string
    categoryId: string
    amount: number;
    date: Date | string
    userId: string
    type: string
    accountId: string
}

export type transactionInput = Omit<transaction, '_id'>