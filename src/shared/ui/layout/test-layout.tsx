import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type TestLayoutProps = { children: ReactNode };

export const TestLayout = ({ children }: TestLayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
});
