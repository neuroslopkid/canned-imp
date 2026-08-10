let currentAppState: string | null = "background";
let changeHandler: ((state: string) => void) | undefined;
const mockListenerCb = jest.fn();
const mockDispatch = jest.fn();
const mockLlm = {
  isReady: true,
  isGenerating: false,
  sendMessage: jest.fn(),
  messageHistory: [] as { role: string; content: string }[],
  interrupt: jest.fn(),
};

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock("@redux/slices/chat/chat-slice", () => ({
  setMessages: (messages: unknown[]) => ({ type: "chat/setMessages", payload: messages }),
}));

jest.mock("expo-notifications", () => ({
  PermissionStatus: { GRANTED: "granted", DENIED: "denied", UNDETERMINED: "undetermined" },
  addNotificationResponseReceivedListener: jest.fn().mockImplementation((cb: (response: unknown) => void) => {
    mockListenerCb.mockImplementation(cb);

    return { remove: jest.fn() };
  }),
  dismissAllNotificationsAsync: jest.fn().mockResolvedValue(undefined),
  scheduleNotificationAsync: jest.fn().mockResolvedValue("id"),
  setNotificationCategoryAsync: jest.fn().mockResolvedValue({}),
}));

jest.mock("@context/llm.provider", () => ({
  useLLMModels: () => ({
    llm: mockLlm,
    selectedModelId: "smollm2_1_135m",
    availableModels: [],
    openModelPicker: jest.fn(),
  }),
}));

jest.mock("@utils", () => ({
  checkNotificationPermission: jest.fn().mockResolvedValue({ status: "granted" }),
}));

import { AppState } from "react-native";
import { dismissAllNotificationsAsync, scheduleNotificationAsync } from "expo-notifications";
import { act, render } from "@testing-library/react-native";
import { useNotificationReplyLoop } from "./use-notification-reply-loop";

const LoopHost = () => {
  useNotificationReplyLoop();

  return null;
};

const renderLoop = async () => {
  return render(<LoopHost />);
};

const replyResponse = (overrides: Record<string, unknown> = {}) => ({
  actionIdentifier: "reply",
  userText: "hello",
  notification: {},
  ...overrides,
});

describe("useNotificationReplyLoop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentAppState = "background";
    changeHandler = undefined;
    mockLlm.sendMessage.mockResolvedValue("AI reply");
    mockLlm.messageHistory = [{ role: "assistant", content: "AI reply" }];
    jest.spyOn(AppState, "addEventListener").mockImplementation(((type: string, handler: unknown) => {
      if (type === "change") {
        changeHandler = handler as (state: string) => void;
      }

      return { remove: jest.fn() };
    }) as never);
    Object.defineProperty(AppState, "currentState", {
      configurable: true,
      get: () => currentAppState,
    });
  });

  it("responds to a reply action in the background", async () => {
    await renderLoop();

    await act(async () => {
      await mockListenerCb(replyResponse());
    });

    expect(mockLlm.sendMessage).toHaveBeenCalledWith("hello");
    expect(scheduleNotificationAsync).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "chat/setMessages",
      payload: [{ role: "assistant", content: "AI reply" }],
    });
  });

  it("ignores the reply when the app is active", async () => {
    currentAppState = "active";
    await renderLoop();

    await act(async () => {
      await mockListenerCb(replyResponse());
    });

    expect(mockLlm.sendMessage).not.toHaveBeenCalled();
    expect(scheduleNotificationAsync).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("ignores taps on the notification body", async () => {
    await renderLoop();

    await act(async () => {
      await mockListenerCb(replyResponse({ actionIdentifier: "expo.modules.notifications.actions.DEFAULT" }));
    });

    expect(mockLlm.sendMessage).not.toHaveBeenCalled();
    expect(scheduleNotificationAsync).not.toHaveBeenCalled();
  });

  it("does not respond when the user text is empty", async () => {
    await renderLoop();

    await act(async () => {
      await mockListenerCb(replyResponse({ userText: undefined }));
    });

    expect(mockLlm.sendMessage).not.toHaveBeenCalled();
    expect(scheduleNotificationAsync).not.toHaveBeenCalled();
  });

  it("dismisses notifications when the app becomes active", async () => {
    await renderLoop();
    expect(changeHandler).toBeDefined();

    await act(async () => {
      changeHandler?.("active");
    });

    expect(dismissAllNotificationsAsync).toHaveBeenCalled();
  });
});
