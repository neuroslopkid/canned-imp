import { View, StyleSheet, Alert, TextInputChangeEvent } from "react-native";
import { Input } from "@ui/components/input";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { Sizes } from "@ui/theme/sizes";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { Ionicons } from "@expo/vector-icons";
import { getScaledSize } from "@helpers/getScaledSize";
import { useDimensions } from "@context";
import { useState } from "react";

export const ChatInput = () => {
  const dimensions = useDimensions();
  const [inputValue, setInputValue] = useState("");

  const handleTextChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <View
      style={[
        styles.container,
        {
          maxWidth: getScaledSize(373, dimensions),
          borderRadius: getScaledSize(20, dimensions),
          height: getScaledSize(Sizes.LineHeight * 2 + 30, dimensions),
          padding: getScaledSize(10, dimensions),
        },
        setDebugStyles(),
      ]}
    >
      <View style={[styles.input, setDebugStyles()]}>
        <Input
          placeholder={"Ask anything... if you dare..."}
          style={{ borderColor: Colors.Transparent, backgroundColor: Colors.Transparent }}
          value={inputValue}
          onChangeText={handleTextChange}
        />
      </View>
      <View style={[styles.buttonsWrapper, setDebugStyles()]}>
        <View style={[styles.leftButtons, setDebugStyles()]}>
          <IconButton
            icon={<Ionicons name="add" size={getScaledSize(24, dimensions)} color={Colors.White} />}
            onPress={() =>
              Alert.alert("Files not available", "File attachments to implemented yet. Please keep in touch!", [
                { text: "Close", style: "destructive", onPress: () => {} },
              ])
            }
          />
        </View>
        <View style={[styles.rightButtons, setDebugStyles()]}>
          <IconButton
            disabled={!inputValue}
            style={{ opacity: inputValue ? 1 : 0.5 }}
            icon={
              inputValue ? (
                <Ionicons name="arrow-up-circle" size={getScaledSize(24, dimensions)} color={Colors.White} />
              ) : (
                <Ionicons name="mic" size={getScaledSize(24, dimensions)} color={Colors.White} />
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BackgroundPrimary,
    borderColor: Colors.BorderMedium,
    borderWidth: 1,
    overflow: "hidden",
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
