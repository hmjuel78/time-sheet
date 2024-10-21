import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleApiError } from './../../helpers/handleApiErrors'
import LocalStorageManager from '../../helpers/localStorageManager'
import { LOCAL_STORAGE_TOKEN_KEY } from '../../helpers/constants'

const BASE_URL = 'https://dev-migration.offsight.com/api/auth/v1'

const { REACT_APP_API_BASE_URL } = import.meta.env

const initialState = {
    isError: false,
    error: null,
    userId: 0,
    userName: '',
    email: '',
    token: LocalStorageManager.getItem(LOCAL_STORAGE_TOKEN_KEY) || ''
}


export const userLogin = createAsyncThunk('auth/userLogin',
    async (payload, { rejectWithValue, signal }) => {
        try {
            const response = await request({
                method: "POST",
                url: `${REACT_APP_API_BASE_URL}/auth/login`,
                data: JSON.stringify(payload),
                withCredentials: false,
                signal,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
        // try {
        //     const response = await axios.post(`${BASE_URL}/login`,
        //         payload,
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 "accept": "/",
        //             },
        //             signal: signal
        //         }
        //     )
        //     return response.data
        // } catch (error) {
        //     return rejectWithValue(handleApiError(error))
        // }
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
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(action.payload.data.token)
                state.token = action.payload.data.token
            });
    }

})

export const authSelector = (state => state.authReducer)
export default authSlice.reducer