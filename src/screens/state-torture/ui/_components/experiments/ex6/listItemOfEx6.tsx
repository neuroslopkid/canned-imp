import { useEffect, useRef } from "react";
import { Button, View } from "react-native";

export const ListItemOfEx6 = ({ name, handlePress }: { name: any; handlePress: any }) => {
  const hasComponentRenderedRef = useRef(false);

  useEffect(() => {
    hasComponentRenderedRef.current = true;
    console.log(`List item ${name} has been rendered`);
  }, []);

  useEffect(() => {
    console.log(`List item ${name} has been updated`);
  });

  return (
    <View style={{ width: "48%" }}>
      <Button title={`${name}`} onPress={(event) => handlePress(event, name)} />
    </View>
  );
};
