import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialerState {
  phoneNumber: string;
  callHistory: string[];
}

const initialState: DialerState = {
  phoneNumber: "",
  callHistory: [],
};

const dialerSlice = createSlice({
  name: "dialer",
  initialState,
  reducers: {
    addDigit: (state, action: PayloadAction<string>) => {
      if (state.phoneNumber.length < 10) {
        state.phoneNumber += action.payload;
      }
    },
    deleteDigit: (state) => {
      state.phoneNumber = state.phoneNumber.slice(0, -1);
    },
    clearNumber: (state) => {
      state.phoneNumber = "";
    },
    addCallToHistory: (state) => {
      if (state.phoneNumber) {
        state.callHistory.unshift(state.phoneNumber);
        state.phoneNumber = ""; // Reset after call
      }
    },
  },
});

export const { addDigit, deleteDigit, clearNumber, addCallToHistory } = dialerSlice.actions;
export default dialerSlice.reducer;
