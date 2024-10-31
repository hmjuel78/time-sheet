import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "./../../helpers/handleApiErrors";
import LocalStorageManager from "../../helpers/localStorageManager";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../helpers/constants";
import request from "./../../confiq/requestConfiq";
import { setLoading } from "../ui/uiSlice";
import { clearTokenDataFromLocal } from "../../helpers/lib";

// const BASE_URL = 'https://dev-migration.offsight.com/api/auth/v1'

const { REACT_APP_API_BASE_URL } = import.meta.env;
console.log(REACT_APP_API_BASE_URL);

const initialState = {
  isError: false,
  error: null,
  userId: 0,
  userName: "",
  email: "",
  token: LocalStorageManager.getItem(LOCAL_STORAGE_TOKEN_KEY) || "",
};

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (payload, { rejectWithValue, signal }) => {
    try {
      const response = await request({
        method: "POST",
        url: `${REACT_APP_API_BASE_URL}/auth/v1/login`,
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getNewAccessToken: (state, action) => {
      state = {
        isLoading: false,
        user_id: 0,
        username: "",
        name: "",
        email: "",
        token: "",
      };
      clearTokenDataFromLocal();
    },
    userLogout: (state, action) => {
      state = {
        isLoading: false,
        user_id: 0,
        username: "",
        name: "",
        email: "",
        token: "",
      };
      clearTokenDataFromLocal();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isError = false;
        setLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        setLoading = false;
        state.token = action.payload.data.token;
      });
  },
});

export const authSelector = (state) => state.authReducer;
export const { getNewAccessToken, userLogout } = authSlice.actions;

export default authSlice.reducer;
