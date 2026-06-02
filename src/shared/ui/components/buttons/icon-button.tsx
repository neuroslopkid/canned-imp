import { ReactNode, useState } from "react";
import { View, StyleSheet, ViewStyle, StyleProp, Pressable, PressableProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { pressableStyles } from "./pressable.styles";

export const IconButton = ({
  icon,
  iconStyle,
  style,
  ...props
}: {
  icon: ReactNode;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
} & PressableProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={[pressableStyles.container, styles.container, style, pressed && pressableStyles.pressed, pressed && styles.pressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      <View style={[styles.iconStyles, iconStyle, pressed && styles.pressedIcon]}>{icon}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Transparent,
    borderColor: Colors.Transparent,
    borderWidth: 1,
    elevation: 0,
  },
  iconStyles: {
    backgroundColor: Colors.Primary,
  },
  pressed: {
    borderColor: Colors.Accent,
  },
  pressedIcon: {
    backgroundColor: Colors.Accent,
  },
});
