import { Text, StyleSheet, TextProps } from "react-native";
import { Colors } from "@ui/theme/colors";
import { Fonts } from "@ui/theme/fonts";

export const FontText = ({ style, children, ...props }: TextProps) => {
  return (
    <Text style={[styles.styles, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  styles: {
    color: Colors.TextPrimary,
    fontFamily: Fonts.OpenSansBold,
  },
});
