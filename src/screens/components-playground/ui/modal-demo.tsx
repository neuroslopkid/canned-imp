import { Tag } from "@ui/tag";
import { Button, Modal, Text, View } from "react-native";

export const ModalDemo = ({ showModal, setShowModal }: { showModal: boolean; setShowModal: any }) => {
  return (
    <>
      <Text>{Tag("Modal")}:</Text>

      <Button title="Show Modal" onPress={() => setShowModal(!showModal)} />

      {/* {showModal && ( */}
      <Modal visible={showModal} animationType="slide" style={{width: 100}}>
        <View>
          <Text>Modal</Text>
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
      {/* )} */}
    </>
  );
};
