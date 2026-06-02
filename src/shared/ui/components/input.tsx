import { StyleSheet, TextInput, Text, View, TextInputProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { Sizes } from "@ui/theme/sizes";
import { useState } from "react";

export const Input = ({ style, ...props }: TextInputProps) => {
  const [text, setText] = useState("");

  return (
    <TextInput placeholderTextColor={Colors.TextPlaceholder} style={[styles.container, style]} {...props}>
      {text}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Sizes.LineHeight,
    maxHeight: Sizes.LineHeight,
    color: Colors.TextPrimary,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.BorderMedium,
    borderWidth: 1,
    backgroundColor: Colors.BackgroundPrimary,
  },
});
