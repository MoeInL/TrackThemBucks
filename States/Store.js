import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./reducers/userInfoReducer";

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
    }
})
