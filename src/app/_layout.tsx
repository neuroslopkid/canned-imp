import { Stack } from "expo-router";
import { initExecutorch } from "react-native-executorch";
import { ExpoResourceFetcher } from "react-native-executorch-expo-resource-fetcher";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { StackParamList } from "@typesInterfaces/navigation.types";
import { Fonts } from "@ui/theme/fonts";
import { useEffect } from "react";
import { DimensionsProvider, LLMProvider } from "@context";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "@redux/store";

initExecutorch({ resourceFetcher: ExpoResourceFetcher });
preventAutoHideAsync();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [Fonts.OpenSans]: require("../../assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.OpenSansBold]: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("transparent");
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <LLMProvider>
          <DimensionsProvider>
            <StatusBar style="auto" />
            <Stack
              screenOptions={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "grey",
                },
              }}
            />
          </DimensionsProvider>
        </LLMProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
