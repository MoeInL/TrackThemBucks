import { createSlice } from '@reduxjs/toolkit'

const WalletInfoSlice = createSlice({
    name: 'Expenses',

    initialState: { 
        information: {
            name: "",
            accountType: "",
            balance: "",
        }
    },

    reducers: {
       pushNameToRedux(state, action) {
            state.information.name = action.payload
        },

        pushAccountTypeToRedux(state, action) {
            state.information.accountType = action.payload
        },

        pushBalanceToredux(state, action) {
            state.information.balance = action.payload
        },
    }
})

export default WalletInfoSlice.reducer
export const { pushNameToRedux } = WalletInfoSlice.actions
export const { pushAccountTypeToRedux } = WalletInfoSlice.actions
export const { pushBalanceToredux } = WalletInfoSlice.actions
