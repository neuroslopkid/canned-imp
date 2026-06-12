import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const debugStyles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderStyle: "dashed",
  },
});

export const setDebugStyles = ({
  borderColor = Colors.Debug,
  activate = false,
}: { borderColor?: string; activate?: boolean } = {}) => {
  const debug = activate || false;

  return debug ? { ...debugStyles.border, ...{ borderColor } } : {};
};
