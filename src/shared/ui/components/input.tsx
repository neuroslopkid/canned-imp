import { StyleSheet, TextInput, Text, View, TextInputProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { Sizes } from "@ui/theme/sizes";
import { useState } from "react";

export const Input = ({ style, ...props }: TextInputProps) => {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput onChangeText={({}) => setText(text)} style={[styles.input, style]} {...props}>
        {text}
      </TextInput>
      <Text style={styles.cross}>X</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 5,
    height: Sizes.LineHeight,
  },
  input: {
    flex: 0.92,
    height: Sizes.LineHeight,
  },
  cross: {
    flex: 0.08,
    textAlign: "center",
    verticalAlign: "middle",
  },
});
