import { DISPLAY_STATE, USER_ACCOUNT_TYPE, USER_BALANCE, USER_NAME, USER_TOKEN, USER_WALLET } from "../actions/types"

const initialState = {
        name: "",
        accountType: "",
        balance: "",
        token: "",
        walletCreated: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_NAME:
            return {
                ...state,
                name: action.payload
            }
        case USER_ACCOUNT_TYPE:
            return {
                ...state,
                accountType: action.payload
            }
        case USER_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        case USER_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case USER_WALLET:
            return {
                ...state,
                walletCreated: action.payload
            }
        case DISPLAY_STATE:
            return {
                ...state,
            }
        default:
            return state
    }}