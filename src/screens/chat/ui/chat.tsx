import { ScrollView, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { TopNavbar } from "@components";
import { ChatLayout } from "./layout/chat-layout";
import { ChatInput } from "./chat-input";
import { ChatWelcome } from "./chat-welcome";
import { Screens } from "@constants";
import { StackParamList } from "@typesInterfaces/navigation.types";
import { Message } from "react-native-executorch";
import { useState } from "react";
import { Colors } from "@ui/theme/colors";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";

export const ChatScreen = () => {
  const route = useRoute<RouteProp<StackParamList, typeof Screens.Chat>>();
  const welcome = route.params.welcome;
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);

  const messages = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  return (
    <ChatLayout headerComponent={<TopNavbar />} footerComponent={<ChatInput setMessageHistory={setMessageHistory} />}>
      {!messageHistory.length ? (
        <ChatWelcome text={welcome} />
      ) : (
        <ScrollView
          style={[{ flex: 1, width: "100%" }, setDebugStyles()]}
          contentContainerStyle={[
            { justifyContent: "flex-start", rowGap: 10, width: "100%", padding: 10 },
            setDebugStyles(),
          ]}
        >
          {messageHistory.map((message, index) => (
            <View
              key={index}
              style={[
                {
                  alignSelf: message.role === "assistant" ? "flex-start" : "flex-end",
                  borderColor: message.role === "assistant" ? "red" : "blue",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderStyle: "solid",
                  padding: 5,
                },
                setDebugStyles(),
              ]}
            >
              <Text style={[{ color: Colors.White }, setDebugStyles()]}>{message.content}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </ChatLayout>
  );
};
