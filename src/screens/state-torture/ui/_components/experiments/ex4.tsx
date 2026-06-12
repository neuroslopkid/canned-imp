import { PrimaryButton } from "@components/buttons/primary-button";
import { useState } from "react";
import { View, Text } from "react-native";

/**
 * 1) selectedItem is still of the value of removed item because it saves POINTER to data, not the copy of data. Data exists in JS memory after deletion
 * 2) The variable in the function body always returns to it's state
 * 3) Don't modify state directly or it will cause state problems
 */
export const Ex4 = () => {
  const [items, setItems] = useState([
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ]);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleDelete = () => {
    console.log({ items });
    console.log({ selectedItem });
    items.pop();
    console.log("Deleted");
    console.log({ items });
    console.log({ selectedItem });
  };

  return (
    <View style={{ flexDirection: "row", columnGap: 20 }}>
      <PrimaryButton style={{ maxWidth: 100 }} text="Delete" onPress={handleDelete} />
      <Text>{items.map((el) => `${el.name}, `)}</Text>
      <Text>{selectedItem.name}</Text>
    </View>
  );
};
