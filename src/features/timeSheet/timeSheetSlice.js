import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./../../helpers/handleApiErrors";
import request from "./../../confiq/requestConfiq";

const { REACT_APP_API_BASE_URL } = import.meta.env;

const initialState = {
  isError: false,
  error: null,
  isLoading: false,
};

export const getProductHours = createAsyncThunk(
  "auth/getProductHours",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await request({
        method: "POST",
        url: `${REACT_APP_API_BASE_URL}/apps/v1/time-sheet/get-product-hours`,
        data: JSON.stringify(payload),
        withCredentials: false,
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const timeSheetSlice = createSlice({
  name: "timeSheet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductHours.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
  },
});

export const timeSheetSelector = (state) => state.timeSheetReducer;

export default timeSheetSlice.reducer;
