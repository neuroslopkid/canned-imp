import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const debugStyles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: Colors.Danger,
  },
});

export const setDebugStyles = ({ borderColor = Colors.Debug }: { borderColor?: string } = {}) => {
  const debug = false;

  return debug ? { ...debugStyles.border, ...{ borderColor } } : {};
};
