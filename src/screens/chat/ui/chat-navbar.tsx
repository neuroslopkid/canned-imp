import { View, StyleSheet } from "react-native";
import { PrimaryText } from "@ui/components/texts/primary-text";
import { Sizes } from "@ui/theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";

export const ChatNavbar = () => {
  return (
    <View style={styles.container}>
      <PrimaryText style={{ textAlign: "left" }}>Logo</PrimaryText>
      <PrimaryText style={{ textAlign: "left" }}>CannedIMP</PrimaryText>
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
