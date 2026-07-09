import { Platform } from "react-native";
import { initExecutorch } from "react-native-executorch";
import { ExpoResourceFetcher } from "react-native-executorch-expo-resource-fetcher";
import { preventAutoHideAsync } from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackParamList } from "@typesInterfaces/navigation.types";
import React, { useEffect } from "react";
import { DimensionsProvider, LLMProvider } from "@context";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Main from "@ui/main";
import * as Notifications from "expo-notifications";

initExecutorch({ resourceFetcher: ExpoResourceFetcher });
preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }, []);

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
