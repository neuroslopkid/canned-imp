import { initExecutorch } from "react-native-executorch";
import { ExpoResourceFetcher } from "react-native-executorch-expo-resource-fetcher";
import { preventAutoHideAsync } from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackParamList } from "@typesInterfaces/navigation.types";
import React from "react";
import { DimensionsProvider, LLMProvider } from "@context";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Main from "@ui/main";

initExecutorch({ resourceFetcher: ExpoResourceFetcher });
preventAutoHideAsync();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <LLMProvider>
            <DimensionsProvider>
              <Main />
            </DimensionsProvider>
          </LLMProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
