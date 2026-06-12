import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "@typesInterfaces/navigation.types";
import { NavigationContainer } from "@react-navigation/native";
import { ChatScreen } from "@src/screens/chat/ui/chat";
import { PlayGroundScreen } from "@src/screens/playground/ui/playground";
import { Fonts } from "@ui/theme/fonts";
import { useEffect } from "react";
import { Screens } from "@constants";
import { DimensionsProvider } from "@context";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import { StateTortureScreen } from "@src/screens/state-torture/ui/state-torture";

preventAutoHideAsync();

// THIS IS HOW STATIC NAVIGATOR IS DEFINED (Current dynamic):

// const RootStack = createNativeStackNavigator({
//   initialRouteName: Screens.Chat,
//   screens: {
//     [Screens.Chat]: {
//       screen: ChatScreen,
//       options: { headerShown: false }, // To remove a navigation header
//     },
//     [Screens.Playground]: {
//       screen: PlayGroundScreen,
//       options: { headerShown: false },
//     },
//   },
// });

// export type RootStackParamList = StaticParamList<typeof RootStack>;

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

// export type StackParamList = StaticParamList<typeof RootStack>;

// const Navigation = createStaticNavigation(RootStack);

const Stack = createNativeStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}

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
    <SafeAreaProvider>
      <DimensionsProvider>
        {/* Dont add any wrapping View with styling */}
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "grey",
              },
              // contentStyle: {
              //   marginTop: -34, // to remove gap between content and navigator
              // },
            }}
          >
            <Stack.Screen name={Screens.Chat} component={ChatScreen} initialParams={{ welcome: "Welcome" }} />
            <Stack.Screen name={Screens.Playground} component={PlayGroundScreen} />
            <Stack.Screen name={Screens.StateTorture} component={StateTortureScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <Navigation /> */}
      </DimensionsProvider>
    </SafeAreaProvider>
  );
}
