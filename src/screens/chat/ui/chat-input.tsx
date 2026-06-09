import { View, StyleSheet, Alert } from "react-native";
import { Input } from "@ui/components/input";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { Sizes } from "@ui/theme/sizes";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { Ionicons } from "@expo/vector-icons";
import { getScaledSize } from "@helpers/getScaledSize";

export const ChatInput = () => {
  return (
    <View style={[styles.container, setDebugStyles({ borderColor: Colors.White })]}>
      <View style={[styles.input, setDebugStyles({ borderColor: Colors.White })]}>
        <Input
          placeholder="Ask anything... if you dare..."
          style={{ borderColor: Colors.Transparent, backgroundColor: Colors.Transparent }}
        />
      </View>
      <View style={[styles.buttonsWrapper, setDebugStyles({ borderColor: Colors.White })]}>
        <View style={[styles.leftButtons, setDebugStyles({ borderColor: Colors.White })]}>
          <IconButton icon={<Ionicons name="add" size={getScaledSize(24)} color={Colors.White} />} />
        </View>
        <View style={[styles.rightButtons, setDebugStyles({ borderColor: Colors.White })]}>
          <IconButton
            onPress={() =>
              Alert.alert("AAAAAAAAAA", "AAAAAA!", [{ text: "Text", style: "destructive", onPress: () => {} }])
            }
            icon={<Ionicons name="mic" size={getScaledSize(24)} color={Colors.White} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: getScaledSize(373),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BackgroundPrimary,
    borderColor: Colors.BorderMedium,
    borderWidth: 1,
    borderRadius: getScaledSize(20),
    overflow: "hidden",
    height: getScaledSize(Sizes.LineHeight * 2 + 30),
    padding: getScaledSize(10),
  },
  input: {
    flex: 1,
    width: "100%",
    textAlign: "left",
  },
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftButtons: { flex: 0.5, flexDirection: "row", justifyContent: "flex-start" },
  rightButtons: { flex: 0.5, flexDirection: "row", justifyContent: "flex-end" },
});
