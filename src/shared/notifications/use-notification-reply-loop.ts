import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useDispatch } from "react-redux";
import { addNotificationResponseReceivedListener, dismissAllNotificationsAsync } from "expo-notifications";
import { setMessages } from "@redux/slices/chat/chat-slice";
import { useLLMModels } from "@context/llm.provider";
import { registerNotificationCategories } from "./categories";
import { deliverReplyAsNotification } from "./deliver-reply";
import { AI_REPLY_ACTION_IDENTIFIER } from "./constants";

export const useNotificationReplyLoop = () => {
  const { llm } = useLLMModels();
  const dispatch = useDispatch();
  const llmRef = useRef(llm);

  useEffect(() => {
    llmRef.current = llm;
  }, [llm]);

  useEffect(() => {
    registerNotificationCategories();
  }, []);

  useEffect(() => {
    if (!llmRef.current?.isReady) {
      return;
    }

    const listener = addNotificationResponseReceivedListener(async (notificationResponse) => {
      if (notificationResponse.actionIdentifier !== AI_REPLY_ACTION_IDENTIFIER || !notificationResponse.userText) {
        return;
      }

      if (AppState.currentState !== "background") {
        return;
      }

      const responseMessage = await llmRef.current?.sendMessage(notificationResponse.userText);

      if (llmRef.current?.messageHistory) {
        dispatch(setMessages([...llmRef.current.messageHistory]));
      }

      if (responseMessage) {
        await deliverReplyAsNotification(responseMessage);
      }
    });

    return () => {
      listener.remove();
    };
  }, [llm?.isReady, dispatch]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        dismissAllNotificationsAsync();
      }
    });

    return () => sub.remove();
  }, []);
};

export const NotificationLoop = () => {
  useNotificationReplyLoop();

  return null;
};
