import { Tag } from "@ui/components/texts/tag";
import { View, Text, Image, StyleSheet } from "react-native";

export const ImageDemo = () => {
  return (
    <>
      <Text>{Tag("Local Image file")}:</Text>

      <View style={styles.container}>
        <Image style={styles.image} source={require("../../../../../assets/favicon.png")} />
      </View>

      <Text>{Tag("Image with URI")}:</Text>

      <View style={styles.imageUriContainer}>
        <Image style={styles.imageUri} source={{ uri: "https://picsum.photos/200/300" }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "gray",
  },
  image: {
    borderWidth: 1,
    borderColor: "black",
    width: 100,
    height: 100,
    margin: 20,
    // padding: 20, // doesn't work
    backgroundColor: "white",
  },
  imageUriContainer: {
    backgroundColor: "transparent",
  },
  imageUri: {
    borderWidth: 1,
    borderColor: "black",
    width: 140,
    height: 140,
    backgroundColor: "white",
  },
});
