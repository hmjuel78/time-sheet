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
  isLoading: false,
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

export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await request({
        method: "POST",
        url: `${REACT_APP_API_BASE_URL}/auth/v1/logout`,
        signal,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getNewAccessToken",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await request({
        method: "POST",
        url: `${REACT_APP_API_BASE_URL}/auth/v1/login/refresh-access-token`,
        refresherToken: "",
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
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await request({
        method: "GET",
        url: `${REACT_APP_API_BASE_URL}/auth/v1/user/management`,
        signal,
      });
      return response.data;
      // const response = await axios.get(
      //   `${REACT_APP_API_BASE_URL}/auth/v1/user/management`,
      //   {
      //     headers: {
      //       "x-authorization": initialState.token,
      //     },
      //     withCredentials: true,
      //     signal,
      //   }
      // );
      // return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // getNewAccessToken: (state, action) => {
    //   state = {
    //     isLoading: false,
    //     user_id: 0,
    //     username: "",
    //     name: "",
    //     email: "",
    //     token: "",
    //   };
    //   clearTokenDataFromLocal();
    // },
    // userLogout: (state, action) => {
    //   state = {
    //     isLoading: false,
    //     user_id: 0,
    //     username: "",
    //     name: "",
    //     email: "",
    //     token: "",
    //   };
    //   clearTokenDataFromLocal();
    // },
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
      .addCase(userLogout.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
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
      .addCase(userLogout.rejected, (state, action) => {
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
      })
      .addCase(getNewAccessToken.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getNewAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.token;
      })
      .addCase(getNewAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const authSelector = (state) => state.authReducer;
// export const { userLogout } = authSlice.actions;

export default authSlice.reducer;
