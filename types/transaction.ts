export type transaction = {
    _id: string
    title: string
    category: string
    amount: number;
    date: Date | string
    userId: string
    type: string
    accountName: string
}

export type transactionInput = Omit<transaction, '_id'>