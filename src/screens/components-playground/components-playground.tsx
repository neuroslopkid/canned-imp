import { ScrollView, StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { TestLayout } from "@shared/ui/layout/test-layout";
import { SetStateAction, useState } from "react";
import { ViewsCube } from "./ui/views-cube";
import { Tag } from "@ui/components/tag";
import { ButtonDemo } from "./ui/button-demo";
import { TextInputDemo } from "./ui/textinput-demo";
import { ScrollViewDemo } from "./ui/scrollview-demo";
import { FlatListDemo } from "./ui/flatlist-demo";
import { ModalDemo } from "./ui/modal-demo";
import { ImageDemo } from "./ui/image-demo";
import { PrimaryButton } from "@ui/components/buttons/primary-button";
import { SecondaryButton } from "@ui/components/buttons/secondary-button";
import { OutlinedButton } from "@ui/components/buttons/outlined-button";
import { DangerButton } from "@ui/components/buttons/danger-button";
import { Input } from "@ui/components/input";
import { Sizes } from "@ui/theme/sizes";

export const ComponentsPlayGroundScreen = () => {
  const [inputString, setInputString] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleTextChange = (propText: SetStateAction<string>) => {
    setInputString(propText);
  };

  const handleAddNote = (clear = false) => {
    setNotes((prevNotes) => [...prevNotes, { data: inputString, id: Math.random().toString() }]);
    clear && setInputString("");
  };

  const handleClearNotes = () => {
    setNotes([]);
  };

  const handleDeleteNote = (id: any) => {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  };

  return (
    <TestLayout>
      <View style={styles.container}>
        {/* <Text>{Tag("Text")} must be placed explicitly inside the text tags</Text> */}

        {/* <ViewsCube />

        <ButtonDemo />

        <TextInputDemo inputString={inputString} handleTextChange={handleTextChange} handleAddNote={handleAddNote} handleClearNotes={handleClearNotes} /> */}

        {/* <ScrollViewDemo data={notes} handleDelete={handleDeleteNote} />

        <FlatListDemo data={notes} />

        <ModalDemo showModal={showModal} setShowModal={setShowModal} />

        <ImageDemo /> */}

        <View style={{ width: "100%", height: Sizes.LineHeight, flexDirection: "row", columnGap: 10 }}>
          <PrimaryButton />
          <SecondaryButton />
          <OutlinedButton />
          <DangerButton />
        </View>

        <Input maxLength={35} keyboardType="number-pad" autoCapitalize="none" autoCorrect={false} />
      </View>
    </TestLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 0,
    marginTop: 50,
    rowGap: 10,
    padding: 0,
  },
});
