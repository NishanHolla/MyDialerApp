import { configureStore } from "@reduxjs/toolkit";
import dialerReducer from "./slices/dialerSlice";

export const store = configureStore({
  reducer: {
    dialer: dialerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
