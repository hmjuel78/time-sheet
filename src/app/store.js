import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";
import timeSheetReducer from "../features/timeSheet/timeSheetSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    timeSheetReducer,
    uiReducer,
  },
});
