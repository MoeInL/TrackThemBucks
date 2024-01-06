import { createSlice } from '@reduxjs/toolkit'

const UserInfoSlice = createSlice({
    name: 'userInfo',

    initialState: { 
        information: {
            name: "",
            accountType: "",
            balance: "",
            token: "",
            walletCreated: false,
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

        pushTokenToRedux(state, action) {
            state.information.token = action.payload
        },

        updateWalletStateInRedux(state, action) {
            state.information.walletCreated = action.payload
        },

        displayReduxState(state) {
            console.log(state.information)
        }
    }
})

export default UserInfoSlice.reducer
export const { pushNameToRedux } = UserInfoSlice.actions
export const { pushAccountTypeToRedux } = UserInfoSlice.actions
export const { pushBalanceToredux } = UserInfoSlice.actions
export const { pushTokenToRedux } = UserInfoSlice.actions
export const { updateWalletStateInRedux } = UserInfoSlice.actions
export const { displayReduxState } = UserInfoSlice.actions

