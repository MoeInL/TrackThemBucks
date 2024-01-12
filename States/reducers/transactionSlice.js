import { createSlice } from '@reduxjs/toolkit'

const TransactionSlice = createSlice({
    name: 'transactions',

    initialState: [],

    reducers: {
        addTransaction: (state, action) => {
            state.length = 0
            state.push(...action.payload)
        },

        deleteTransactionInRedux: (state, action) => {
            state = state.filter(item => item.id !== action.payload)
        },

        setTransactions: (state, action) => {
            state = action.payload
        }  
    }
})

export const { addTransaction } = TransactionSlice.actions
export const { deleteTransactionInRedux } = TransactionSlice.actions
export const { setTransactions } = TransactionSlice.actions
export default TransactionSlice.reducer