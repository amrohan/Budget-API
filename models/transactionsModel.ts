import { transaction } from "../types/transaction";
import * as db from '../db'

export const all = (): Promise<transaction[]> => {
    return db.get().collection('transactions').find<transaction>({}).toArray()

}