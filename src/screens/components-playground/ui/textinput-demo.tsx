import { Tag } from "@ui/tag";
import { TextInput, View, Text, StyleSheet, Button } from "react-native";

export const TextInputDemo = (props: any) => {
  return (
    <>
      <View style={styles.textInputWrapper}>
        <Text>{Tag("TextInput")}:</Text>
        <TextInput placeholder="Type here..." style={styles.textInput} value={props.inputString} onChangeText={props.handleTextChange}></TextInput>
        <Text style={styles.textInputOutput}>{props.inputString}</Text>
      </View>

      <View>
        <View style={styles.addNoteButtonsContainer}>
          <Button title="Add a note" onPress={() => props.handleAddNote(true)} />
          <Button title="Clear" onPress={props.handleClearNotes} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInputWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 20,
  },
  textInputOutput: {
    maxWidth: 100,
    maxHeight: 100,
    overflow: "scroll",
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    width: 100,
    borderRadius: 10,
  },
  addNoteButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 20,
  },
});
