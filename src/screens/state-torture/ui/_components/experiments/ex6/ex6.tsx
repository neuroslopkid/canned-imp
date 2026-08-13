/* eslint-disable no-console */
import { memo, useEffect, useRef, useState } from "react";
import { View, Text, Button } from "react-native";
import { ChildrenOfEx6 } from "./childrenOfEx6";

const MemoChildOfEx6 = memo(ChildrenOfEx6, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title;
});

export const Ex6 = () => {
  const hasComponentRenderedRef = useRef(false);
  const componentRef = useRef(null);
  const [parentTitle, setParentTitle] = useState("Parent title");
  const [childrenTitle, setChildrenTitle] = useState("Children Title via props");
  // let initialNum = 10;

  useEffect(() => {
    hasComponentRenderedRef.current = true;
    console.log("Parrent component have been rendered");
  }, []);

  // useEffect(() => {
  //   if (hasComponentRenderedRef) {
  //     console.log({ ref: componentRef.current });
  //   }
  // }, [hasComponentRenderedRef]);

  useEffect(() => {
    console.log("Parrent has been updated");
  });

  const handleButtonClick = () => {
    console.log("------------------------------------------");
    console.log("Updated children props with parents state:");
    setChildrenTitle(`Buttons ${new Date().getMilliseconds()}`);

    // console.log("------------------------------------------");
    // console.log("Updated children props directly:");
    // initialNum++;
    // console.log({ initialNum });
  };

  const handleParentButtonClick = () => {
    console.log("------------------------------------------");
    console.log("Updated parent state:");
    setParentTitle(`${new Date().getMilliseconds()}`);
  };

  return (
    <View ref={componentRef}>
      <Text>Hello World!</Text>
      <Text>{parentTitle}</Text>
      <View style={{ width: 200 }}>
        <Button title="Update parent title" onPress={handleParentButtonClick} />
      </View>
      <View style={{ width: 200 }}>
        <Button title="Update children title" onPress={handleButtonClick} />
      </View>
      <MemoChildOfEx6 title={childrenTitle} />
    </View>
  );
};
