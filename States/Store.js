import {configureStore} from '@reduxjs/toolkit';
import WalletInfoSlice from './WalletInfoSlice';

export const store = configureStore({
    reducer: {
        walletInfoData: WalletInfoSlice,
    }
})