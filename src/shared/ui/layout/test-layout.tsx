import { Colors } from "@ui/theme/colors";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type TestLayoutProps = { children: ReactNode };

export const TestLayout = ({ children }: TestLayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderColor: Colors.White,
    borderWidth: 1,
    backgroundColor: Colors.BackgroundRoot,
    padding: 20
  },
});
