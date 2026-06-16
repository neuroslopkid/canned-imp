import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

type MessageType = any;

interface MessageState {
  messages: MessageType[];
}

const initialState: MessageState = {
  messages: [],
};

const reducers: SliceCaseReducers<MessageState> = {
  addMessages: (state, action: PayloadAction<MessageType[]>) => {
    state.messages.push(...action.payload);
  },
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers,
});

export const { addMessages } = messageSlice.actions;
export const messageSliceReducer = messageSlice.reducer;
