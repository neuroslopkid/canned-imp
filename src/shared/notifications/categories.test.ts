jest.mock("expo-notifications", () => ({
  setNotificationCategoryAsync: jest.fn(),
}));

import { setNotificationCategoryAsync } from "expo-notifications";
import { registerNotificationCategories } from "./categories";
import { AI_CHAT_CATEGORY_ID, AI_REPLY_ACTION_IDENTIFIER } from "./constants";

const mockSetCategory = setNotificationCategoryAsync as jest.Mock;

describe("registerNotificationCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("registers the AI chat category with a reply text-input action", async () => {
    await registerNotificationCategories();

    expect(mockSetCategory).toHaveBeenCalledWith(
      AI_CHAT_CATEGORY_ID,
      expect.arrayContaining([
        expect.objectContaining({
          identifier: AI_REPLY_ACTION_IDENTIFIER,
          buttonTitle: "Reply",
          options: { opensAppToForeground: false },
          textInput: expect.objectContaining({
            placeholder: "Message…",
            submitButtonTitle: "Send",
          }),
        }),
      ]),
    );
  });
});
