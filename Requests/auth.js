import axios from "axios";

const API_KEY = 'AIzaSyCtrx_HgsO9ZBKdc9I48OgZ7ho1yB5J97w'

export async function authenticate(mode, email, password, name){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    const response = await axios.post(url, {
        email: email,
        password: password,
        name: name,
        returnSecureToken: true
    })

    const token = response.data.idToken

    return token
}

export async function creatUser(email, password, name){
    await authenticate('signUp', email, password, name)
}

export async function loginUser(email, password){
    await authenticate('signInWithPassword', email, password)
}

export async function resetPassword(email){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`
    const response = await axios.post(url, {
        email: email,
        requestType: "PASSWORD_RESET"
    })

    return response
}