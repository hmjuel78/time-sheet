import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./../../helpers/handleApiErrors";
import LocalStorageManager from "../../helpers/localStorageManager";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../helpers/constants";
import request from "./../../confiq/requestConfiq";
import {
  clearTokenDataFromLocal,
  setTokenDataToLocal,
} from "../../helpers/lib";
import { method } from "lodash";
import axios from "axios";

const { REACT_APP_API_BASE_URL } = import.meta.env;

const initialState = {
  isError: false,
  error: null,
  userId: 0,
  userName: "",
  email: "",
  token: LocalStorageManager.getItem(LOCAL_STORAGE_TOKEN_KEY) || "",
  managementDatas: [],
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

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue, signal }) => {
    try {
      const response = await request({
        method: "POST",
        url: `${REACT_APP_API_BASE_URL}/auth/v1/logout`,
        data: JSON.stringify(payload),
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const management = createAsyncThunk(
  "auth/management",
  async (payload, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_BASE_URL}/auth/v1/user/management`,
        {
          headers: {
            "x-authorization": initialState.token,
          },
          withCredentials: true,
          signal,
        }
      );
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
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        const token = action.payload.data.token;
        state.token = token;
        setTokenDataToLocal(token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Failed to login";
      })
      .addCase(logout.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state = {
          isLoading: false,
          user_id: 0,
          username: "",
          name: "",
          email: "",
          token: "",
        };
        clearTokenDataFromLocal();
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isError = true;
      })
      .addCase(management.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(management.fulfilled, (state, action) => {
        state.isLoading = false;
        state.managementDatas = action.payload.data;
      })
      .addCase(management.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const authSelector = (state) => state.authReducer;
export const { getNewAccessToken, userLogout } = authSlice.actions;

export default authSlice.reducer;
