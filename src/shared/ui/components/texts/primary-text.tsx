import { Text, StyleSheet, TextProps } from "react-native";
import { Colors } from "@ui/theme/colors";

export const PrimaryText = ({ style, children, ...props }: TextProps) => {
  return (
    <Text style={[styles.styles, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  styles: {
    color: Colors.TextPrimary,
  },
});
