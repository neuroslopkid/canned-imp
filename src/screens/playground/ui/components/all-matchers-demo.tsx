import { useState } from "react";
import { View, Text, TextInput, Switch, Button, Pressable, StyleSheet } from "react-native";

export const valueForToBe = "exact match";
export const floatForToBeCloseTo = 0.1 + 0.2;
export const valueForToBeDefined = "defined";
export const valueForToBeFalsy = "";
export const numberForToBeGreaterThan = 5;
export const numberForToBeGreaterThanOrEqual = 5;
export const dateForToBeInstanceOf = new Date(2024, 0, 1);
export const numberForToBeLessThan = 3;
export const numberForToBeLessThanOrEqual = 3;
export const nanForToBeNaN = NaN;
export const nullForToBeNull = null;
export const valueForToBeTruthy = 123;
export const undefinedForToBeUndefined = undefined;
export const arrayForToContain = [1, 2, 3];
export const arrayForToContainEqual = [{ id: 1 }, { id: 2 }];
export const objectForToEqual = { a: 1, b: 2 };
export const stringForToHaveLength = "hello";
export const objectForToHaveProperty = { name: "test", value: 42 };
export const stringForToMatch = "Hello World";
export const objectForToMatchObject = { a: 1, b: 2, c: 3 };
export const objectForToStrictEqual = { a: 1 };
export const fnForToThrow = () => {
  throw new Error("test error");
};
export const valueForToMatchSnapshot = { a: 1, b: 2 };
export const fnForToThrowError = () => {
  throw new Error("snapshot error");
};

type AllMatchersDemoProps = {
  onPress?: (value: string) => string;
};

export const AllMatchersDemo = ({ onPress }: AllMatchersDemoProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <View testID="all-matchers-container" accessibilityLabel="all-matchers-container" style={styles.container}>
      <Text testID="default-text" accessibilityLabel="default-text">
        Visible
      </Text>

      <View testID="empty-view" accessibilityLabel="empty-view" />

      <View testID="parent-view" accessibilityLabel="parent-view">
        <View testID="child-view" accessibilityLabel="child-view" />
      </View>

      <Text testID="static-text" accessibilityLabel="static-text">
        fixed text
      </Text>

      <View testID="styled-view" accessibilityLabel="styled-view" style={styles.styledView} />

      <TextInput testID="text-input" accessibilityLabel="text-input" defaultValue="hello" />

      <Switch value={true} testID="checked-el" accessibilityLabel="checked-el" />

      <View
        testID="partially-checked-el"
        accessibilityLabel="partially-checked-el"
        accessibilityState={{ checked: "mixed" }}
        accessibilityRole="checkbox"
        accessible
      />

      <Button disabled title="Disabled Button" testID="disabled-el" accessibilityLabel="disabled-el" />

      <Button title="Enabled Button" testID="enabled-el" accessibilityLabel="enabled-el" />

      <View
        testID="busy-el"
        accessibilityLabel="busy-el"
        accessibilityState={{ busy: true }}
        accessibilityRole="progressbar"
        accessible
      />

      <Pressable testID="expanded-el" accessibilityLabel="expanded-el" accessibilityState={{ expanded: true }}>
        <Text>Expanded</Text>
      </Pressable>

      <Pressable testID="collapsed-el" accessibilityLabel="collapsed-el" accessibilityState={{ expanded: false }}>
        <Text>Collapsed</Text>
      </Pressable>

      <Pressable
        testID="selected-el"
        accessibilityLabel="selected-el"
        accessibilityState={{ selected: true }}
        accessibilityRole="tab"
      >
        <Text>Selected</Text>
      </Pressable>

      <View
        testID="acc-value-el"
        accessibilityLabel="acc-value-el"
        accessibilityValue={{ min: 0, max: 100, now: 50 }}
        accessible
      />

      <View testID="named-el" accessibilityLabel="named-el" accessible />

      <TextInput
        testID="mock-action-input"
        accessibilityLabel="mock-action-input"
        placeholder="Type something..."
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.mockInput}
      />

      <Button
        title="Trigger Mock"
        testID="mock-action-button"
        accessibilityLabel="mock-action-button"
        onPress={() => {
          onPress?.(inputValue || "hello");
          setInputValue("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    rowGap: 4,
  },
  styledView: {
    opacity: 0.5,
  },
  mockInput: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    padding: 5,
  },
});
