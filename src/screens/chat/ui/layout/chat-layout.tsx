import { ReactNode } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@ui/theme/colors";

type ChatLayoutProps = { headerComponent: ReactNode; children: ReactNode; footerComponent: ReactNode };

export const ChatLayout = ({ headerComponent, children: mainComponent, footerComponent }: ChatLayoutProps) => {
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={[
        Colors.BackgroundPrimary,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
        Colors.Black,
      ]}
    >
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.image}
        resizeMode="cover"
        source={require("../../../../../assets/graph.jpg")}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>{headerComponent}</View>
          <View style={styles.main}>{mainComponent}</View>
          <View style={styles.footer}>{footerComponent}</View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    padding: 20,
  },
  header: {
    flex: 0.2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  main: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
  },
  image: {
    opacity: 0.15,
  },
  linearGradient: {
    flex: 1,
    width: "100%",
  },
});
