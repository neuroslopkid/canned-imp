import { useRoute, RouteProp } from "@react-navigation/native";
import { TopNavbar } from "@components";
import { ChatLayout } from "./layout/chat-layout";
import { ChatInput } from "./chat-input";
import { ChatWelcome } from "./chat-welcome";
import { Screens } from "@constants";
import { StackParamList } from "@typesInterfaces/navigation.types";

export const ChatScreen = () => {
  const route = useRoute<RouteProp<StackParamList, typeof Screens.Chat>>();
  const welcome = route.params.welcome;

  return (
    <ChatLayout headerComponent={<TopNavbar />} footerComponent={<ChatInput />}>
      <ChatWelcome text={welcome} />
    </ChatLayout>
  );
};
