import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import uiReducer from '../features/ui/uiSlice'


export const store = configureStore({
    reducer: {
        authReducer,
        uiReducer
    },
})