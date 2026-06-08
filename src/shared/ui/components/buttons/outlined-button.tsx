import { useState } from "react";
import { Text, StyleSheet, ViewStyle, StyleProp, Pressable, PressableProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { pressableStyles } from "./pressable.styles";

export const OutlinedButton = ({
  text = "Text",
  textStyle,
  style,
  ...props
}: {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
} & PressableProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={[pressableStyles.container, styles.container, style, pressed && pressableStyles.pressed, pressed && styles.pressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      <Text style={[styles.textStyles, textStyle, pressed && styles.pressedText]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderColor: Colors.Primary,
    borderWidth: 1,
    elevation: 0,
  },
  textStyles: {
    color: Colors.Primary,
  },
  pressed: {
    borderColor: Colors.Accent,
  },
  pressedText: {
    color: Colors.Accent,
  },
});
