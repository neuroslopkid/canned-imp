import { Sizes } from "@ui/theme/sizes";
import { StyleSheet } from "react-native";

export const pressableStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    height: Sizes.LineHeight / 1.25,
    // iOS
    shadowRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    // Android
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
