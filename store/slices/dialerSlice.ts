import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialerState {
  phoneNumber: string;
  countryCode: string;
  callHistory: string[];
}

const initialState: DialerState = {
  phoneNumber: "",
  countryCode: "+1", // Default country code (USA)
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
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    addCallToHistory: (state) => {
      if (state.phoneNumber) {
        state.callHistory.unshift(`${state.countryCode} ${state.phoneNumber}`);
        state.phoneNumber = ""; // Reset after call
      }
    },
  },
});

export const { addDigit, deleteDigit, clearNumber, setCountryCode, addCallToHistory } =
  dialerSlice.actions;
export default dialerSlice.reducer;
