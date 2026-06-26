import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SecurityState } from "./security-slice.type";

const initialState: SecurityState = {
  location: undefined,
  address: undefined,
};

const reducers = {
  setGeolocationData: (state: SecurityState, action: PayloadAction<SecurityState>) => {
    state.location = action.payload.location;
    state.address = action.payload.address;
  },
  setLocation: (state: SecurityState, action: PayloadAction<SecurityState["location"]>) => {
    state.location = action.payload;
  },
  setAddress: (state: SecurityState, action: PayloadAction<SecurityState["address"]>) => {
    state.address = action.payload;
  },
};

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers,
});

export const { setLocation, setGeolocationData, setAddress } = securitySlice.actions;
export const securitySliceReducer = securitySlice.reducer;
