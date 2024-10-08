import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
})

export const { setLoading } = uiSlice.actions
export const uiSelector = (state => state.uiReducer)
export default uiSlice.reducer
