import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./reducers/userInfoReducer";
import transactionIcons from "./reducers/transactionIconsReducer";
import transactionCreated from "./reducers/transactionReducer";

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
        icons: transactionIcons,
        transactions: transactionCreated
    }
})
