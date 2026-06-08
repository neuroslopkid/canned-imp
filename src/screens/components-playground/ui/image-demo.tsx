import { Tag } from "@ui/components/texts/tag";
import { View, Text, Image, StyleSheet } from "react-native";

export const ImageDemo = () => {
  return (
    <>
      <Text>{Tag("Image")}:</Text>

      <View style={styles.container}>
        <Image style={styles.image} source={require("../../../../assets/favicon.png")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: "gray",
  },
  image: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 100,
    margin: 20,
    // padding: 20, // doesn't work
    backgroundColor: "white"
  },
});
