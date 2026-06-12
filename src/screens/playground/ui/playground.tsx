import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { SetStateAction, useState } from "react";
import { Input } from "@components/input";
import { Tag } from "@components/texts/tag";
import { TopNavbar } from "@components/top-navbar";
import { DangerButton } from "@components/buttons/danger-button";
import { PrimaryButton } from "@components/buttons/primary-button";
import { OutlinedButton } from "@components/buttons/outlined-button";
import { SecondaryButton } from "@components/buttons/secondary-button";
import { ViewsCube } from "./components/views-cube";
import { ImageDemo } from "./components/image-demo";
import { ModalDemo } from "./components/modal-demo";
import { ButtonDemo } from "./components/button-demo";
import { FlatListDemo } from "./components/flatlist-demo";
import { TextInputDemo } from "./components/textinput-demo";
import { ScrollViewDemo } from "./components/scrollview-demo";
import { Sizes } from "@ui/theme/sizes";
import { Colors } from "@ui/theme/colors";
import { BaseLayout } from "@ui/layout/base-layout";
import { Screens } from "@constants/screens";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@typesInterfaces/navigation.types";

type PlaygroundNavigationProp = NativeStackNavigationProp<StackParamList>;

export const PlayGroundScreen = ({ navigation }: { navigation: PlaygroundNavigationProp }) => {
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
    <BaseLayout headerComponent={<TopNavbar />} footerComponent={<></>}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <Text>{Tag("Text")} must be placed explicitly inside the text tags</Text>

        <ViewsCube />

        <ButtonDemo />

        <TextInputDemo
          inputString={inputString}
          handleTextChange={handleTextChange}
          handleAddNote={handleAddNote}
          handleClearNotes={handleClearNotes}
        />

        <ScrollViewDemo data={notes} handleDelete={handleDeleteNote} />
        <FlatListDemo data={notes} />
        <ModalDemo showModal={showModal} setShowModal={setShowModal} />

        <ImageDemo />

        <View style={{ width: "100%", height: Sizes.LineHeight, flexDirection: "row", columnGap: 10 }}>
          <PrimaryButton />
          <SecondaryButton />
          <OutlinedButton />
          <DangerButton />
        </View>

        <Input
          style={{ width: 200 }}
          maxLength={35}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <PrimaryButton
          text="Navigate to Chat"
          onPress={() => navigation.navigate(Screens.Chat, { welcome: "You've returned..." })}
        />

      </ScrollView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.White,
    rowGap: 10,
    padding: 5,
  },
});
