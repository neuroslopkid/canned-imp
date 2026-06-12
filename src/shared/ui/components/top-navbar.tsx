import { View, StyleSheet, Text, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Screens } from "@constants";
import { FontText } from "@ui/components/texts/font-text";
import { Sizes } from "@ui/theme/sizes";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { setDebugStyles } from "@ui/theme/debug.styles";
import ImpSvg from "../../../../assets/images/imp.svg";
import { getScaledSize } from "@helpers/getScaledSize";
import { useDimensions } from "@context";
import { useState } from "react";
import { NavigationTypes } from "@typesInterfaces/navigation.types";

export const TopNavbar = () => {
  const { navigate } = useNavigation<NavigationTypes>();
  const route = useRoute();
  const dimensions = useDimensions();
  const [open, setOpen] = useState(false);

  const handleOpenNavmenu = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigation = (screen: any, params: any = {}) => {
    setOpen(false);
    navigate(screen, params);
  };

  return (
    <View style={[styles.container, { height: getScaledSize(Sizes.LineHeight, dimensions) }]}>
      <View style={styles.topBarContainer}>
        <ImpSvg
          fill={Colors.White}
          width={getScaledSize(Sizes.LineHeight / 2, dimensions)}
          height={getScaledSize(Sizes.LineHeight / 2, dimensions)}
        />
        <FontText style={[{ verticalAlign: "middle", textAlign: "left" }, setDebugStyles()]}>CannedIMP</FontText>
        <View style={styles.navWrapper}>
          <IconButton
            style={{ height: 48, width: 48 }}
            onPress={handleOpenNavmenu}
            icon={<Ionicons name="chevron-down" size={24} color={Colors.White} />}
          />
          {open && (
            <View style={styles.navmenu}>
              {route.name !== Screens.Chat && (
                <Text
                  onPress={() => handleNavigation(Screens.Chat)}
                  style={{ color: Colors.TextPrimary, fontSize: getScaledSize(14, dimensions) }}
                >
                  Chat
                </Text>
              )}
              {route.name !== Screens.Playground && (
                <Text
                  onPress={() => handleNavigation(Screens.Playground)}
                  style={{ color: Colors.TextPrimary, fontSize: getScaledSize(14, dimensions) }}
                >
                  Playground
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      <Text style={{ color: Colors.TextPrimary, fontSize: getScaledSize(14, dimensions) }}>
        {Platform.select({ android: "Android", ios: "IOS" })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 6,
    backgroundColor: Colors.Black,
    paddingLeft: 20,
    paddingRight: 20,
  },
  topBarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 6,
  },
  navWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navmenu: {
    borderRadius: 10,
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    top: 50,
    padding: 15,
    width: 120,
    rowGap: 20,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: Colors.Black,
    zIndex: 51,
  },
});
