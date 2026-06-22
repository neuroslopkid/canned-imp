import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SecurityState } from "./security-slice.type";
import { LocationObject } from "expo-location";

const initialState: SecurityState = {
  location: undefined,
};

const reducers = {
  setLocation: (state: SecurityState, action: PayloadAction<LocationObject>) => {
    state.location = action.payload;
  },
};

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers,
});

export const { setLocation } = securitySlice.actions;
export const securitySliceReducer = securitySlice.reducer;
