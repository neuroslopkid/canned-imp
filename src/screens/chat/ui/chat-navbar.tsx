import { View, StyleSheet, Image } from "react-native";
import { FontText } from "@ui/components/texts/font-text";
import { Sizes } from "@ui/theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { setDebugStyles } from "@ui/theme/debug.styles";
import ImpSvg from "../../../../assets/images/imp.svg";

export const ChatNavbar = () => {
  return (
    <View style={styles.container}>
      <ImpSvg fill={Colors.White} width={Sizes.LineHeight / 2} height={Sizes.LineHeight / 2} />
      <FontText style={[{ verticalAlign: "middle", textAlign: "left" }, setDebugStyles()]}>CannedIMP</FontText>
      <IconButton icon={<Ionicons name="chevron-down" size={24} color={Colors.White} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: Sizes.LineHeight,
    columnGap: 5,
  },
});
