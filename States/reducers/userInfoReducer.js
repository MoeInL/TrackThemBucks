import { USER_INFO, USER_ID, USER_ACCOUNT_TYPE, USER_BALANCE, USER_NAME, USER_TOKEN, USER_WALLET} from "../actions/userInfoTypes"

const initialState = {
    name: "",
    accountType: "",
    balance: "",
    token: "",
    id: "",
    walletCreated: false,
}

export default (userInfo = initialState, action) => {
    switch (action.type) {
        case USER_NAME:
            return {
                ...userInfo,
                name: action.payload
            }
        case USER_ACCOUNT_TYPE:
            return {
                ...userInfo,
                accountType: action.payload
            }
        case USER_BALANCE:
            return {
                ...userInfo,
                balance: action.payload
            }
        case USER_TOKEN:
            return {
                ...userInfo,
                token: action.payload
            }
        case USER_WALLET:
            return {
                ...userInfo,
                walletCreated: action.payload
            }
        case USER_ID:
            return {
                ...userInfo,
                id: action.payload
            }
        case USER_INFO:
            return {
                state: action.payload
            }
        default:
            return userInfo
    }
}