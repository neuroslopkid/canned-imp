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
          data={data}
          style={styles.flastList}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={(itemData) => {
            return (
              <Text>
                {itemData.index + 1}: {itemData.item.data}
              </Text>
            );
          }}
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
