import { ReactNode } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { ChatLinearGradient } from "./constants";

type ChatLayoutProps = { headerComponent: ReactNode; children: ReactNode; footerComponent: ReactNode };

export const ChatLayout = ({ headerComponent, children: mainComponent, footerComponent }: ChatLayoutProps) => {
  return (
    <LinearGradient style={[styles.linearGradient, setDebugStyles()]} colors={ChatLinearGradient}>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.image}
        resizeMode="cover"
        source={require("../../../../../assets/graph.jpg")}
      >
        <SafeAreaView style={[styles.safeAreaContainer, setDebugStyles({ borderColor: "red" })]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.keyboardAvoidingContainer, setDebugStyles({ borderColor: "green" })]}
          >
            <View style={[styles.header, setDebugStyles({ borderColor: "blue" })]}>{headerComponent}</View>
            <View style={[styles.main, setDebugStyles()]}>{mainComponent}</View>
            <View style={[styles.footer, setDebugStyles({ borderColor: "yellow" })]}>{footerComponent}</View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  safeAreaContainer: {
    flex: 1,
    width: "100%",
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  image: {
    opacity: 0.15,
  },
  linearGradient: {
    flex: 1,
    width: "100%",
  },
});
