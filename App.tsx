import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { ChatScreen } from "@src/screens/chat/ui/chat";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { Fonts } from "@ui/theme/fonts";
import { useEffect } from "react";

preventAutoHideAsync();

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
      <View style={[styles.rootContainer, setDebugStyles({ borderColor: "purple" })]}>
        <ChatScreen />
        <StatusBar style="dark" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
