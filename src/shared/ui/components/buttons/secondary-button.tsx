import { Text, StyleSheet, ViewStyle, StyleProp, Pressable, PressableProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { pressableStyles } from "./pressable.styles";

export const SecondaryButton = ({
  text = "Text",
  textStyle,
  style,
  ...props
}: {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
} & PressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [pressableStyles.container, styles.container, style, pressed && pressableStyles.pressed, pressed && styles.pressed]}
      {...props}
    >
      <Text style={[styles.textStyles, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary,
  },
  textStyles: {
    color: Colors.TextSecondary,
  },
  pressed: {
    elevation: 10,
  },
});
