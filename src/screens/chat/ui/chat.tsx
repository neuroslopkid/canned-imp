import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TopNavbar } from "@components";
import { ChatLayout } from "./layout/chat-layout";
import { ChatInput } from "./chat-input";
import { ChatWelcome } from "./chat-welcome";
import { Colors } from "@ui/theme/colors";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { useSelector } from "react-redux";
import { StoreState } from "@redux/store";

export const ChatScreen = () => {
  // const route = useRoute<RouteProp<StackParamList, typeof Screens.Chat>>();
  // const welcome = route.params.welcome;

  const { welcome = "Welcome" } = useLocalSearchParams<{
    welcome?: string;
  }>();

  const messageHistory = useSelector((state: StoreState) => state.chat.messages);

  return (
    <ChatLayout headerComponent={<TopNavbar />} footerComponent={<ChatInput />}>
      {!messageHistory.length ? (
        <ChatWelcome text={welcome} />
      ) : (
        <ScrollView
          style={[{ flex: 1, width: "100%", maxWidth: 600 }, setDebugStyles()]}
          contentContainerStyle={[
            {
              justifyContent: "flex-start",
              alignItems: "center",
              rowGap: 10,
              width: "100%",
              padding: 10,
            },
            setDebugStyles(),
          ]}
        >
          {messageHistory.map((message, index) => (
            <View
              key={index}
              style={[
                {
                  alignSelf: message.role === "assistant" ? "flex-start" : "flex-end",
                  backgroundColor: Colors.BackgroundPrimary,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderStyle: "solid",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                },
                setDebugStyles(),
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  left: -5,
                  borderRadius: 5,
                  backgroundColor: message.role === "assistant" ? "red" : "blue",
                  width: 10,
                  height: 10,
                }}
              ></View>
              <Text style={[{ color: Colors.White }, setDebugStyles()]}>{message.content}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </ChatLayout>
  );
};
