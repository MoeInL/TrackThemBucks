import { CREATE_TRANSACTION } from "./transactionTypes"

export const createTransaction = (transaction) => {
    return {
        type: CREATE_TRANSACTION,
        payload: transaction
    }
}