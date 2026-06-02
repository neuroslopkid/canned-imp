import { View, StyleSheet, Alert } from "react-native";
import { Input } from "@ui/components/input";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { Circle } from "react-native-svg";
import { Sizes } from "@ui/theme/sizes";

export const ChatInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.centerPart}>
        <Input style={{ borderColor: Colors.Transparent, backgroundColor: Colors.Transparent }} />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.leftPart}>
          <IconButton icon={<View></View>} />
        </View>
        <View style={styles.rightPart}>
          <IconButton
            onPress={() =>
              Alert.alert("AAAAAAAAAA", "AAAAAA!", [{ text: "Text", style: "destructive", onPress: () => {} }])
            }
            icon={<Circle />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: Colors.BackgroundPrimary,
    borderColor: Colors.BorderMedium,
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    opacity: 1,
  },
  centerPart: {
    flex: 1,
    width: "100%",
    textAlign: "left",
  },
  buttonWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftPart: {
    flex: 0.5,
  },
  rightPart: {
    flex: 0.5,
  },
});
