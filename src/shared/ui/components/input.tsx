import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { Sizes } from "@ui/theme/sizes";
import { useState } from "react";
import { getScaledSize } from "@helpers/getScaledSize";
import { useDimensions } from "@context";

export const Input = ({ style, ...props }: TextInputProps) => {
  const [text, setText] = useState("");
  const dimensions = useDimensions();

  return (
    <TextInput
      placeholderTextColor={Colors.TextPlaceholder}
      style={[
        styles.container,
        {
          height: getScaledSize(Sizes.LineHeight, dimensions),
          maxHeight: getScaledSize(Sizes.LineHeight, dimensions),
          paddingLeft: getScaledSize(10, dimensions),
          paddingRight: getScaledSize(10, dimensions),
          fontSize: getScaledSize(14, dimensions),
        },
        style,
      ]}
      {...props}
    >
      {text}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.TextPrimary,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.BorderMedium,
    borderWidth: 1,
    backgroundColor: Colors.BackgroundPrimary,
  },
});
