import { ReactNode, useState } from "react";
import { View, StyleSheet, ViewStyle, StyleProp, Pressable, PressableProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { pressableStyles } from "./pressable.styles";
import { Sizes } from "@ui/theme/sizes";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { getScaledSize } from "@helpers/getScaledSize";

export const IconButton = ({
  icon,
  iconStyle,
  style,
  size,
  ...props
}: {
  icon: ReactNode;
  style?: StyleProp<ViewStyle>;
  size?: any;
  iconStyle?: StyleProp<ViewStyle>;
} & PressableProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={[
        pressableStyles.container,
        styles.pressableContainer,
        style,
        pressed && [pressableStyles.pressed, styles.pressedPressable],
        setDebugStyles(),
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      <View style={[styles.icon, iconStyle, pressed && styles.pressedIcon, setDebugStyles()]}>{icon}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 0,
    backgroundColor: Colors.Transparent,
    borderColor: Colors.Transparent,
    borderWidth: 1,
    elevation: 0,
    borderRadius: "100%",
    padding: getScaledSize(10),
    width: getScaledSize(Sizes.IconSize + 20),
    height: getScaledSize(Sizes.IconSize + 20),
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: getScaledSize(Sizes.IconSize),
    height: getScaledSize(Sizes.IconSize),
    borderRadius: "100%",
    backgroundColor: Colors.Transparent,
  },
  pressedPressable: { backgroundColor: Colors.BackgroundSecondary },
  pressedIcon: {},
});
