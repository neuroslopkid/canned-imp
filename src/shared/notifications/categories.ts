import * as Notifications from "expo-notifications";
import { AI_CHAT_CATEGORY_ID, AI_REPLY_ACTION_IDENTIFIER } from "./constants";

export async function registerNotificationCategories() {
  await Notifications.setNotificationCategoryAsync(AI_CHAT_CATEGORY_ID, [
    {
      identifier: AI_REPLY_ACTION_IDENTIFIER,
      buttonTitle: "Reply",
      options: { opensAppToForeground: false },
      textInput: {
        placeholder: "Message…",
        submitButtonTitle: "Send",
      },
    },
  ]);
}
