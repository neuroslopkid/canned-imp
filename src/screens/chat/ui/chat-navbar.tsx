import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "@constants";
import { FontText } from "@ui/components/texts/font-text";
import { Sizes } from "@ui/theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { setDebugStyles } from "@ui/theme/debug.styles";
import ImpSvg from "../../../../assets/images/imp.svg";
import { getScaledSize } from "@helpers/getScaledSize";

export const ChatNavbar = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <ImpSvg
        fill={Colors.White}
        width={getScaledSize(Sizes.LineHeight / 2)}
        height={getScaledSize(Sizes.LineHeight / 2)}
      />
      <FontText style={[{ verticalAlign: "middle", textAlign: "left" }, setDebugStyles()]}>CannedIMP</FontText>
      <IconButton icon={<Ionicons name="chevron-down" size={24} color={Colors.White} />} />
      <Text onPress={() => navigate(Screens.Chat)} style={{ color: Colors.TextPrimary, fontSize: getScaledSize(14) }}>
        Chat
      </Text>
      <Text
        onPress={() => navigate(Screens.ComponentsPlayground)}
        style={{ color: Colors.TextPrimary, fontSize: getScaledSize(14) }}
      >
        Test
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: getScaledSize(Sizes.LineHeight),
    columnGap: 6,
    backgroundColor: Colors.Black,
  },
});
