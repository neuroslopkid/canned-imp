import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TestLayout } from "@shared/ui/layout/test-layout";
import { SetStateAction, useState } from "react";

export const ComponentsPlayGroundScreen = () => {
  const [counter, setCounter] = useState(0);
  const [inputString, setInputString] = useState("");
  const [notes, setNotes] = useState<any[]>([]);

  const handleTextChange = (propText: SetStateAction<string>) => {
    setInputString(propText);
  };

  const handlePress = () => {
    setCounter(counter + 1);
  };

  const handleAddNote = (clear = false) => {
    setNotes((prevNotes) => [...prevNotes, inputString]);
    clear && setInputString("");
  };

  const handleClearNotes = () => {
    setNotes([]);
  };

  return (
    <TestLayout>
      <View style={styles.container}>
        <Text>&lt;Text&#47;&gt; must be placed explicitly inside the Text tags</Text>

        <View>
          <Text>&lt;View&#47;&gt; is a div-alike component</Text>
        </View>

        <View style={styles.viewDemoContainer}>
          <View style={{ ...{ backgroundColor: "red", width: "25%" }, ...styles.viewDemoItem }}>
            <Text style={styles.viewDemoItemText}>1</Text>
          </View>
          <View style={{ ...{ backgroundColor: "green", width: "60%" }, ...styles.viewDemoItem }}>
            <Text style={styles.viewDemoItemText}>2</Text>
          </View>
          <View style={{ ...{ backgroundColor: "blue", width: "15%" }, ...styles.viewDemoItem }}>
            <Text style={styles.viewDemoItemText}>3</Text>
          </View>
          <View style={{ ...{ backgroundColor: "yellow", width: "25%" }, ...styles.viewDemoItem }}>
            <Text style={{ ...styles.viewDemoItemText, ...{ color: "black" } }}>4</Text>
          </View>
          <View style={{ ...{ backgroundColor: "purple", width: "60%" }, ...styles.viewDemoItem }}>
            <Text style={styles.viewDemoItemText}>5</Text>
          </View>
          <View style={{ ...{ backgroundColor: "cyan", width: "15%" }, ...styles.viewDemoItem }}>
            <Text style={{ ...styles.viewDemoItemText, ...{ color: "black" } }}>6</Text>
          </View>
          <View style={{ ...{ backgroundColor: "magenta", width: "25%" }, ...styles.viewDemoItem }}>
            <Text style={styles.viewDemoItemText}>7</Text>
          </View>
          <View style={{ ...{ backgroundColor: "gold", width: "60%" }, ...styles.viewDemoItem }}>
            <Text style={styles.viewDemoItemText}>8</Text>
          </View>
          <View style={{ ...{ backgroundColor: "ivory", width: "15%" }, ...styles.viewDemoItem }}>
            <Text style={{ ...styles.viewDemoItemText, ...{ color: "black" } }}>9</Text>
          </View>
        </View>

        <Button title="&lt;Button&#47;&gt; Have no style!" />

        <View style={styles.wrappedButtonContainer}>
          <Button title="But can be wrapped!" onPress={handlePress} />
          <Text>{counter}</Text>
        </View>

        <View style={styles.textInputWrapper}>
          <Text>&lt;TextInput&#47;&gt;:</Text>
          <TextInput placeholder="Type here..." style={styles.textInput} value={inputString} onChangeText={handleTextChange}></TextInput>
          <Text style={styles.textInputOutput}>{inputString}</Text>
        </View>

        <View>
          <View style={styles.addNoteButtonsContainer}>
            <Button title="Add a note" onPress={() => handleAddNote(true)} />
            <Button title="Clear" onPress={handleClearNotes} />
          </View>
        </View>

        <Text>&lt;ScrollView&#47;&gt; size are defined by it's parrent container:</Text>

        <View style={styles.scrollViewContainer}>
          <Text style={{ color: "white" }}>Parrent container:</Text>
          <ScrollView alwaysBounceVertical={false} style={styles.scrollView}>
            {notes.map((note, index) => (
              <Text key={`note-${index}`}>
                {index + 1}: {note}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </TestLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 0,
    marginTop: 50,
    rowGap: 10,
    padding: 0,
  },
  viewDemoContainer: {
    flexDirection: "row",
    width: 100,
    height: 100,
    flexWrap: "wrap",
  },
  viewDemoItem: {
    height: "33.33%",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewDemoItemText: {
    color: "white",
  },
  wrappedButtonContainer: {
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 0,
    columnGap: 10,
    borderRadius: "100%",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    overflow: "hidden",
    backgroundColor: "gold",
  },
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
  scrollViewContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "gray",
  },
  scrollView: {
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
