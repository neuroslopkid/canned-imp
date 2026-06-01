import { Text } from "react-native";

export const Tag = (tagName: string) => {
  return (
    <Text style={{ backgroundColor: "#ddd" }}>
      <Text style={{ color: "grey" }}>&lt;</Text>
      <Text style={{ color: "orange" }}>{tagName}</Text>
      <Text style={{ color: "grey" }}>&#47;&gt;</Text>
    </Text>
  );
};
