import { configureStore } from "@reduxjs/toolkit";
import { messageSliceReducer } from "./slices/message-slice";
import { baseApi } from "./api/base";

export const store = configureStore({
  reducer: {
    messages: messageSliceReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
