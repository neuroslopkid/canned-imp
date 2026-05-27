import { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export const ButtonDemo = () => {
  const [counter, setCounter] = useState(0);

  const handlePress = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <Button title="&lt;Button&#47;&gt; Have no style!" />

      <View style={styles.wrappedButtonContainer}>
        <Button title="But can be wrapped!" onPress={handlePress} />
        <Text>{counter}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrappedButtonContainer: {
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 0,
    columnGap: 10,
    borderRadius: "100%",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    overflow: "hidden",
    backgroundColor: "gold",
  },
});
