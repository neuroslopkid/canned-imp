import { PrimaryButton } from "@components/buttons/primary-button";
import { useState } from "react";
import { View, Text } from "react-native";

/**
 * If you can avoid using state and get data from other source then do it instead of sync of 3+ states
 */
export const Ex3 = () => {
  const [firstName] = useState("John");
  const [lastName] = useState("Doe");
  const [fullName, setFullName] = useState("");

  const merge = () => {
    setFullName(`${firstName} ${lastName}`);
  };

  return (
    <View style={{ flexDirection: "row", columnGap: 20 }}>
      <PrimaryButton style={{ maxWidth: 100 }} text="Merge" onPress={merge} />
      <Text>{firstName}</Text>
      <Text>{lastName}</Text>
      <Text>{fullName}</Text>
    </View>
  );
};
