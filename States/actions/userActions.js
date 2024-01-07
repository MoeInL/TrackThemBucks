import { USER_ACCOUNT_TYPE, USER_BALANCE, USER_ERROR, USER_NAME, USER_TOKEN, USER_WALLET } from "./types"

const API_KEY = 'AIzaSyCtrx_HgsO9ZBKdc9I48OgZ7ho1yB5J97w'

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

// *************** THIS FUNCTION IS NOT BEING USED *************** //
// export const pushTokenToRedux = (token) => {
//     return {
//         type: USER_TOKEN,
//         payload: token
//     }
// }

export const authenticate = (mode, email, password, name) => async (dispatch) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
   
   try{ const response = await axios.post(url, {
        email: email,
        password: password,
        name: name,
        returnSecureToken: true
    })

    const token = response.data.idToken

    dispatch({
        type: USER_TOKEN,
        payload: token,
      });

} catch (err) {
    dispatch({
        type: USER_ERROR,
        payload: err.code,
      });
}
    
}

export const updateWalletStateInRedux = (walletCreated) => {
    return {
        type: USER_WALLET,
        payload: walletCreated
    }
}

