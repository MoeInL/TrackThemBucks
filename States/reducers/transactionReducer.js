import { CREATE_TRANSACTION } from "../actions/transaction/transactionTypes"

const initialState = []

export default (expenseList = initialState, action) => {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return [...expenseList, action.payload];
        default:
            return expenseList
    }
}

