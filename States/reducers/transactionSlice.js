import { createSlice } from '@reduxjs/toolkit'

const TransactionSlice = createSlice({
    name: 'transactions',

    initialState: [],

    reducers: {
        addTransaction: (state, action) => {
            state.length = 0
            state.push(...action.payload)
        },

        editTransaction: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id)
            state[index] = action.payload
        },
        
        deleteTransaction: (state, action) => {
            state = state.filter(item => item.id !== action.payload)
        },
    }
})

export const { addTransaction } = TransactionSlice.actions
export const { editTransaction } = TransactionSlice.actions
export const { deleteTransaction } = TransactionSlice.actions
export default TransactionSlice.reducer