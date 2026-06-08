import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { ChatScreen } from "@src/screens/chat/ui/chat";
import { ComponentsPlayGroundScreen } from "@src/screens/components-playground/ui/components-playground";
import { Fonts } from "@ui/theme/fonts";
import { useEffect } from "react";

preventAutoHideAsync();

const RootStack = createNativeStackNavigator({
  initialRouteName: "Chat",
  screens: {
    Chat: {
      screen: ChatScreen,
      options: { headerShown: false }, // To remove a navigation header
    },
    ComponentsPlayground: {
      screen: ComponentsPlayGroundScreen,
      options: { headerShown: false },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const [fontsLoaded] = useFonts({
    [Fonts.OpenSans]: require("./assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.OpenSansBold]: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      {/* Dont add any wrapping View with styling */}
      <StatusBar style="dark" />
      <Navigation />
    </SafeAreaProvider>
  );
}

