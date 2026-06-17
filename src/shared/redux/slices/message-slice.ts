import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "./message-slice.type";
import { Message } from "react-native-executorch";

const initialState: MessageState = {
  messages: [],
};

const reducers = {
  setMessages: (state: MessageState, action: PayloadAction<Message[]>) => {
    state.messages = action.payload;
  },
  addMessages: (state: MessageState, action: PayloadAction<Message[]>) => {
    state.messages.push(...action.payload);
  },
  clearMessages: (state: MessageState) => {
    state.messages = [];
  },
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers,
});

export const { setMessages, addMessages, clearMessages } = messageSlice.actions;
export const messageSliceReducer = messageSlice.reducer;
