import { Tag } from "@ui/components/texts/tag";
import { Pressable, ScrollView, View, Text, StyleSheet } from "react-native";

export const ScrollViewDemo = (props: any) => {
  return (
    <>
      <Text>{Tag("ScrollView")} size are defined by it's parrent container:</Text>

      <View style={styles.scrollViewContainer}>
        <Text style={{ color: "white" }}>Parrent container:</Text>
        <ScrollView alwaysBounceVertical={false} style={styles.scrollView} testID="scroll-view-with-text">
          {props.data.map((item: any, index: any) => (
            <Pressable
              android_ripple={{ color: "#F00" }}
              style={({ pressed }) => pressed && { opacity: 0.5 }}
              onPress={() => props.handleDelete(item.id)}
              key={`item-${index}`}
              testID="scroll-view-pressable"
            >
              <Text testID="scroll-view-pressable-text-width-data">
                {index + 1}: {item.data}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "gray",
  },
  scrollView: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
