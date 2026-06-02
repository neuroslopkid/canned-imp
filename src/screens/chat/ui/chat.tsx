import { View, StyleSheet, Image } from "react-native";
import { PrimaryText } from "@ui/components/texts/primary-text";
import { ChatLayout } from "./layout/chat-layout";
import { ChatInput } from "./chat-input";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@ui/theme/colors";

export const ChatScreen = () => {
  return (
    <ChatLayout
      headerComponent={
        <View>
          <PrimaryText>Test</PrimaryText>
        </View>
      }
      footerComponent={<ChatInput />}
    >
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          colors={[Colors.BackgroundPrimary, Colors.Black, Colors.Black, Colors.BackgroundPrimary]}
        >
          <PrimaryText>Welcome</PrimaryText>
        </LinearGradient>
        <Image src={"https://www.svgrepo.com/show/521303/react-16.svg"} />
      </View>
    </ChatLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 100,
  },
  gradient: {
    padding: 20,
    borderRadius: 20,
  },
});
