import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState } from "./chat-slice.type";
import { Message } from "react-native-executorch";

const initialState: ChatState = {
  messages: [],
};

const reducers = {
  setMessages: (state: ChatState, action: PayloadAction<Message[]>) => {
    state.messages = action.payload;
  },
  addMessages: (state: ChatState, action: PayloadAction<Message[]>) => {
    state.messages.push(...action.payload);
  },
  clearMessages: (state: ChatState) => {
    state.messages = [];
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers,
});

export const { setMessages, addMessages, clearMessages } = chatSlice.actions;
export const chatSliceReducer = chatSlice.reducer;
