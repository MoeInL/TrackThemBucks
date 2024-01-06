import {configureStore} from '@reduxjs/toolkit';
import UserInfoSlice from './UserInfoSlice';

export const store = configureStore({
    reducer: {
        userInfoData: UserInfoSlice,
    }
})