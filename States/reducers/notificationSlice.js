import { createSlice } from '@reduxjs/toolkit'

const NotificationSlice = createSlice({
    name: 'notification',

    initialState: {},

    reducers: {
        addNotification: (state, action) => {
            state = action.payload
        },
    }
})

export const { addNotification } = NotificationSlice.actions
export default NotificationSlice.reducer