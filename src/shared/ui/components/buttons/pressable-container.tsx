import { Pressable, StyleSheet, GestureResponderEvent, ViewStyle, StyleProp } from "react-native";

export const PressableContainer = ({
  children,
  onPress,
  style,
  ...props
}: {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, style, pressed && styles.pressed]} {...props}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 30,
    maxHeight: 30,
    // iOS
    shadowRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    // Android
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
