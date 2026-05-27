import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type BaseLayoutProps = { children: ReactNode };

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
});
