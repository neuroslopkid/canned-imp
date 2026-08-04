import { AppState } from "react-native";
import { PermissionStatus, scheduleNotificationAsync } from "expo-notifications";
import { checkNotificationPermission } from "@utils";
import { AI_CHAT_CATEGORY_ID } from "./constants";

export async function deliverReplyAsNotification(reply: string) {
  if (!reply) {
    return;
  }

  if (AppState.currentState !== "background" && AppState.currentState !== "inactive") {
    return;
  }

  const permission = await checkNotificationPermission();
  if (permission.status !== PermissionStatus.GRANTED) {
    return;
  }

  const today = new Date();
  const minutes = String(today.getUTCMinutes()).padStart(2, "0");

  await scheduleNotificationAsync({
    content: {
      title: `${today.getUTCHours()}:${minutes}`,
      body: reply,
      categoryIdentifier: AI_CHAT_CATEGORY_ID,
    },
    trigger: null,
  });
}
