import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userReducer";

// export default combineReducers({
//     userInfo: userReducer,
// })

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
    }
})
