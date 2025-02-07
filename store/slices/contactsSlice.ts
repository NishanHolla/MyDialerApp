import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface ContactsState {
  contacts: Contact[];
  searchQuery: string;
}

const initialState: ContactsState = {
  contacts: [],
  searchQuery: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<{ name: string; phone: string }>) => {
      state.contacts.push({ id: uuidv4(), ...action.payload });
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addContact, removeContact, setSearchQuery } = contactsSlice.actions;
export default contactsSlice.reducer;
