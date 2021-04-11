import { configureStore } from "@reduxjs/toolkit"
import useReducer from '../features/counterSlice.js'
import chatReducer from '../features/chatSlice.js'

export const store = configureStore({
    reducer: {
        user: useReducer,
        chat: chatReducer,
    },
});
