import { DISPLAY_STATE, USER_ACCOUNT_TYPE, USER_BALANCE, USER_NAME, USER_TOKEN, USER_WALLET } from "./types"

export const pushNameToRedux = (name) => {
    return {
        type: USER_NAME,
        payload: name
    }
}

export const pushAccountTypeToRedux = (accountType) => {
    return {
        type: USER_ACCOUNT_TYPE,
        payload: accountType
    }
}

export const pushBalanceToredux = (balance) => {
    return {
        type: USER_BALANCE,
        payload: balance
    }
}

export const pushTokenToRedux = (token) => {
    return {
        type: USER_TOKEN,
        payload: token
    }
}

export const updateWalletStateInRedux = (walletCreated) => {
    return {
        type: USER_WALLET,
        payload: walletCreated
    }
}

export const displayReduxState = () => {
    return {
        type: DISPLAY_STATE
    }
}
