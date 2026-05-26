import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ComponentsPlayGroundScreen } from "@src/screens/components-playground/components-playground";

export default function App() {
  return (
    <View style={styles.container}>
      <ComponentsPlayGroundScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
