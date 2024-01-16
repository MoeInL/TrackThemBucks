import { createSlice } from '@reduxjs/toolkit'

const NotificationSlice = createSlice({
    name: 'notification',

    initialState: {},

    reducers: {
        addNotification: (state, action) => {
            state = action.payload
        },

        deleteNotification: (state) => {
            state = {}
        },
    }
})

export const { addNotification } = NotificationSlice.actions
export const { deleteNotification } = NotificationSlice.actions
export default NotificationSlice.reducer