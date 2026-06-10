import { TopNavbar } from "@components";
import { ChatLayout } from "./layout/chat-layout";
import { ChatInput } from "./chat-input";
import { ChatWelcome } from "./chat-welcome";

export const ChatScreen = () => {
  return (
    <ChatLayout headerComponent={<TopNavbar />} footerComponent={<ChatInput />}>
      <ChatWelcome />
    </ChatLayout>
  );
};
