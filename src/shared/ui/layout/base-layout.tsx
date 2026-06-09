import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { DimensionsOverlay } from "@ui/components/dimensions-overlay";

type ChatLayoutProps = { headerComponent: ReactNode; children: ReactNode; footerComponent: ReactNode };

export const BaseLayout = ({ headerComponent, children: mainComponent, footerComponent }: ChatLayoutProps) => {
  return (
    <>
      <SafeAreaView style={[styles.safeAreaContainer, setDebugStyles({ borderColor: "red" })]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.keyboardAvoidingContainer, setDebugStyles({ borderColor: "green" })]}
        >
          <DimensionsOverlay />
          <View style={[styles.header, setDebugStyles({ borderColor: "blue" })]}>{headerComponent}</View>
          <View style={[styles.main, setDebugStyles()]}>{mainComponent}</View>
          <View style={[styles.footer, setDebugStyles({ borderColor: "yellow" })]}>{footerComponent}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
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
});
