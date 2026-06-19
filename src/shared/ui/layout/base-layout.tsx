import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setDebugStyles } from "@ui/theme/debug.styles";

type ChatLayoutProps = {
  headerComponent: ReactNode;
  children: ReactNode;
  footerComponent: ReactNode;
  safeAreaStyles?: StyleProp<ViewStyle>;
};

export const BaseLayout = ({
  headerComponent,
  children: mainComponent,
  footerComponent,
  safeAreaStyles,
}: ChatLayoutProps) => {
  return (
    <>
      <SafeAreaView
        edges={["left", "right", "bottom", "top"]}
        style={[styles.safeAreaContainer, safeAreaStyles, setDebugStyles()]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[styles.keyboardAvoidingContainer, setDebugStyles()]}
        >
          <View style={[styles.header, setDebugStyles()]}>{headerComponent}</View>
          <View style={[styles.main, setDebugStyles()]}>{mainComponent}</View>
          <View style={[styles.footer, setDebugStyles()]}>{footerComponent}</View>
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
    backgroundColor: "black",
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
