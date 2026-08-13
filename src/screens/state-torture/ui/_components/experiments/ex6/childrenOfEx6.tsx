import { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Button, GestureResponderEvent } from "react-native";
import { ListItemOfEx6 } from "./listItemOfEx6";

const MemoListItemOfEx6 = memo(ListItemOfEx6, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});

export const ChildrenOfEx6 = ({ title }: { title: string }) => {
  const hasComponentRenderedRef = useRef(false);
  const componentRef = useRef(null);
  const [elemList, setElemList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [ownTitle, setOwnTitle] = useState("Aloha!");

  useEffect(() => {
    hasComponentRenderedRef.current = true;
    console.log("Children component have been rendered");
  }, []);

  useEffect(() => {
    console.log("Children has been updated");
  });

  const handleButtonClick = useCallback((e: GestureResponderEvent, elem: number) => {
    console.log(`Removed ${elem}`);
    setElemList((prevList) => prevList.filter((prevElem) => prevElem !== elem));
  }, []);

  const handleTitleClick = () => {
    setOwnTitle("Bye");
  };

  return (
    <View
      ref={componentRef}
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        columnGap: 10,
        rowGap: 10,
        padding: 20,
        borderColor: "black",
        flexWrap: "wrap",
        borderWidth: 1,
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text>{title}</Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Button title={`${ownTitle}`} onPress={handleTitleClick} />
      </View>
      {elemList.map((elem) => (
        <MemoListItemOfEx6 key={elem} name={elem} handlePress={handleButtonClick} />
        // <ListItemOfEx6 key={elem} name={elem} handlePress={handleButtonClick} />
      ))}
    </View>
  );
};
