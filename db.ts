import { Db, MongoClient } from "mongodb";

const state: { db: Db | null } = { db: null }

export const connect = async (url: string, dbname: string): Promise<void> => {
    try {
        if (state.db)
            return
        const client = MongoClient.connect(url)
        await client
        state.db = (await client).db(dbname)


    } catch (error) {
        console.log("🚀 ~ file: db.ts:9 ~ connect ~ error:", error)
    }
}

export const get = (): Db => {
    if (!state.db)
        throw new Error('Database not connected')
    return state.db

}