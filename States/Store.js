import {configureStore} from '@reduxjs/toolkit';
import userInfoSlice from './UserInfoSlice';

export const store = configureStore({
    reducer: {
        userInfoData: userInfoSlice,
    }
})