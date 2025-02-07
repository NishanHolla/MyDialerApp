import { configureStore } from "@reduxjs/toolkit";
import dialerReducer from "./slices/dialerSlice";
import contactReducer from "./slices/contactsSlice";

export const store = configureStore({
  reducer: {
    dialer: dialerReducer,
    contacts: contactReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
