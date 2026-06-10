import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { ChatScreen } from "@src/screens/chat/ui/chat";
import { PlayGroundScreen } from "@src/screens/playground/ui/playground";
import { Fonts } from "@ui/theme/fonts";
import { useEffect } from "react";
import { Screens } from "@constants";
import { DimensionsProvider } from "@context";
import * as SystemUI from "expo-system-ui";

preventAutoHideAsync();

const RootStack = createNativeStackNavigator({
  initialRouteName: Screens.Chat,
  screens: {
    [Screens.Chat]: {
      screen: ChatScreen,
      options: { headerShown: false }, // To remove a navigation header
    },
    [Screens.Playground]: {
      screen: PlayGroundScreen,
      options: { headerShown: false },
    },
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [fontsLoaded] = useFonts({
    [Fonts.OpenSans]: require("./assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.OpenSansBold]: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("transparent");
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider style={{ backgroundColor: "red" }}>
      <DimensionsProvider>
        {/* Dont add any wrapping View with styling */}
        <StatusBar style="dark" />
        <Navigation />
      </DimensionsProvider>
    </SafeAreaProvider>
  );
}
