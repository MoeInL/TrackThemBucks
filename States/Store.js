import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./reducers/userInfoReducer";
import transactionIcons from "./reducers/transactionIconsReducer";
import TransactionSlice from "./reducers/transactionSlice";
import notificationSlice from './reducers/notificationSlice';

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
        icons: transactionIcons,
        transactions: TransactionSlice,
        notification: notificationSlice
    }
})
