import { getDimensions, roundToDecimalPlaces } from "@helpers";
import { Colors } from "@ui/theme/colors";
import { View, Text, StyleSheet } from "react-native";

export const DimensionsOverlay = () => {
  const screen = getDimensions("screen");
  const window = getDimensions("window");

  return (
    <View style={styles.overlay}>
      <View style={styles.overlayInner}>
        <Text style={styles.title}>Screen</Text>
        {(Object.keys(screen) as (keyof typeof screen)[]).map((prop) => (
          <Text key={`screen-${prop}`}>{`${prop}: ${roundToDecimalPlaces(screen[prop], 2)}`}</Text>
        ))}
        <Text style={styles.title}>Window</Text>
        {(Object.keys(window) as (keyof typeof window)[]).map((prop) => (
          <Text key={`window-${prop}`}>{`${prop}: ${roundToDecimalPlaces(window[prop], 2)}`}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "#2f2f2fb5",
    borderRadius: 15,
    paddingTop: 2,
    paddingRight: 5,
    paddingLeft: 2,
    paddingBottom: 5,
    top: 48,
    right: 5,
    zIndex: 50,
  },
  overlayInner: {
    flex: 1,
    backgroundColor: "#909090b5",
    borderRadius: 15,
    padding: 10,
  },
  title: {
    color: Colors.Danger,
  },
});
