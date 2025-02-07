import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialerState {
  phoneNumber: string;
}

const initialState: DialerState = {
  phoneNumber: "",
};

const dialerSlice = createSlice({
  name: "dialer",
  initialState,
  reducers: {
    addDigit: (state, action: PayloadAction<string>) => {
      state.phoneNumber += action.payload;
    },
    deleteDigit: (state) => {
      state.phoneNumber = state.phoneNumber.slice(0, -1);
    },
    clearNumber: (state) => {
      state.phoneNumber = "";
    },
  },
});

export const { addDigit, deleteDigit, clearNumber } = dialerSlice.actions;
export default dialerSlice.reducer;
