import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { chatSliceReducer } from "./slices/chat";
import { securitySliceReducer } from "./slices/security";
import { baseApi } from "./api/base";
import { SecurityState } from "./slices/security/security-slice.type";

const securityPersistConfig: PersistConfig<SecurityState> = {
  key: "security",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
    security: persistReducer<SecurityState>(securityPersistConfig, securitySliceReducer),
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
