import { ChatLayout } from "./layout/chat-layout";
import { ChatInput } from "./chat-input";
import { ChatNavbar } from "./chat-navbar";
import { ChatWelcome } from "./chat-welcome";

export const ChatScreen = () => {
  return (
    <ChatLayout headerComponent={<ChatNavbar />} footerComponent={<ChatInput />}>
      <ChatWelcome />
    </ChatLayout>
  );
};
