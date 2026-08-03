import { Tag } from "@ui/components/texts/tag";
import { FlatList, View, Text, StyleSheet } from "react-native";

export const FlatListDemo = ({ data }: any) => {
  return (
    <>
      <Text>{Tag("FlatList")} exists for an efficient rendering of large collections of items:</Text>

      <View style={styles.flatListContainer}>
        <Text style={{ color: "black" }}>Parent container:</Text>
        <FlatList
          alwaysBounceVertical={false}
          scrollEnabled={false}
          data={data}
          style={styles.flastList}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(itemData) => {
            return (
              <Text testID="flat-list-with-text-item">
                {itemData.index + 1}: {itemData.item.data}
              </Text>
            );
          }}
          testID="flat-list-with-text"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "lightgrey",
  },
  flastList: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
