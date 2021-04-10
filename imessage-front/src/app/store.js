import { configureStore } from "@reduxjs/toolkit"
import useReducer from '../features/counterSlice.js'

export const store = configureStore({
    reducer: {
        user: useReducer,
    },
});
