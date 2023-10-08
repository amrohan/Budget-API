export type Account = {
    _id: string
    userId: string
    accountName: string
}

export type AccountInput = Omit<Account, '_id'>