import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@ui/theme/colors";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { PrimaryText } from "@ui/components/texts/primary-text";

export const ChatWelcome = () => {
  return (
    <View style={[styles.container, setDebugStyles()]}>
      <LinearGradient
        style={[styles.gradient, setDebugStyles()]}
        colors={[Colors.BackgroundPrimary, Colors.Black, Colors.Black, Colors.BackgroundPrimary]}
      >
        <PrimaryText>Welcome</PrimaryText>
      </LinearGradient>
      <Image src={"https://www.svgrepo.com/show/521303/react-16.svg"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 100,
  },
  gradient: {
    padding: 20,
    borderRadius: 20,
  },
});
