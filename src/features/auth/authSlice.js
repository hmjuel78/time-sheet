import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleApiError } from './../../helpers/handleApiErrors';


const BASE_URL = 'https://dev-migration.offsight.com/api/auth/v1/'
const initialState = {
    isError: false,
    error: null,
    isLoading: false,
    users: []
}

export const userLogin = createAsyncThunk('auth/userLogin',
    async (payload, { rejectWithValue, signal }) => {

        try {
            const response = await axios.post(BASE_URL, {
                signal: signal,
            })
            return response.data
        } catch (error) {
            return rejectWithValue(handleApiError(error))
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
    }

})

export const authSelector = (state) => state.auth.value
export default authSlice.reducer