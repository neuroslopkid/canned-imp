jest.mock("@context/dimensions.provider", () => ({
  useDimensions: () => ({
    width: 400,
    height: 800,
  }),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

jest.mock("@context/llm.provider", () => ({
  useLLMModels: jest.fn(),
}));

import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { RightChatButtons } from "./right-chat-buttons";
import { useLLMModels } from "@context/llm.provider";
import { LLMType } from "react-native-executorch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const interrupt = jest.fn();
const sendMessage = jest.fn();
const setInputValue = jest.fn();

const baseLLM = {
  isReady: true,
  isGenerating: false,
  sendMessage,
  interrupt,
};

const mockLLM = (overrides: Partial<LLMType> = {}) => {
  (useLLMModels as jest.Mock).mockReturnValue({
    ...baseLLM,
    ...overrides,
  });
};

const renderComponent = async (inputValue = "") => {
  return render(<RightChatButtons inputValue={inputValue} setInputValue={setInputValue} />);
};

describe("RightChatButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders mic button when input is empty", async () => {
    const rightChatButtons = await renderComponent();

    expect(rightChatButtons.getByTestId("stt-mic-button")).toBeOnTheScreen();
    expect(rightChatButtons.queryByTestId("send-message-to-llm-button")).toBeNull();
  });

  it("renders send button when input is pressent", async () => {
    const rightChatButtons = await renderComponent("some text");

    expect(rightChatButtons.queryByTestId("stt-mic-button")).toBeNull();
    expect(rightChatButtons.getByTestId("send-message-to-llm-button")).toBeOnTheScreen();
  });

  it("renders interrupt and activity indicator button while generating", async () => {
    mockLLM({ isGenerating: true });
    const rightChatButtons = await renderComponent("Hello");

    expect(rightChatButtons.getByTestId("interrupt-llm-button")).toBeOnTheScreen();
    expect(rightChatButtons.getByTestId("activity-indicator")).toBeOnTheScreen();
  });

  it("sends message, clears input and stores it", async () => {
    mockLLM();
    const rightChatButtons = await renderComponent("Hello2");
    const sendButton = rightChatButtons.getByTestId("send-message-to-llm-button");

    expect(sendButton).toBeOnTheScreen();
    expect(sendMessage).toHaveBeenCalledTimes(0);

    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith("Hello2");
    });

    expect(setInputValue).toHaveBeenCalledWith("");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("lastMessage", "Hello2");
  });

  it("not sends message if is generating", async () => {
    mockLLM({ isGenerating: true });
    const rightChatButtons = await renderComponent("Hello2");
    const sendButton = rightChatButtons.getByTestId("send-message-to-llm-button");

    expect(sendButton).toBeOnTheScreen();
    expect(sendMessage).toHaveBeenCalledTimes(0);

    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(sendMessage).not.toHaveBeenCalled();
    });

    expect(setInputValue).not.toHaveBeenCalled();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("not sends message if is not ready", async () => {
    mockLLM({ isReady: false });
    const rightChatButtons = await renderComponent("Hello2");
    const sendButton = rightChatButtons.getByTestId("send-message-to-llm-button");

    expect(sendButton).toBeOnTheScreen();
    expect(sendMessage).toHaveBeenCalledTimes(0);

    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(sendMessage).not.toHaveBeenCalled();
    });

    expect(setInputValue).not.toHaveBeenCalled();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("not sends message if is no sendMessage() method", async () => {
    mockLLM({ sendMessage: undefined });
    const rightChatButtons = await renderComponent("Hello2");
    const sendButton = rightChatButtons.getByTestId("send-message-to-llm-button");

    expect(sendButton).toBeOnTheScreen();
    expect(sendMessage).toHaveBeenCalledTimes(0);

    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(sendMessage).not.toHaveBeenCalled();
    });

    expect(setInputValue).not.toHaveBeenCalled();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("not sends message if is no input value", async () => {
    mockLLM();
    const rightChatButtons = await renderComponent("");
    const micButton = rightChatButtons.getByTestId("stt-mic-button");

    expect(micButton).toBeOnTheScreen();
    fireEvent.press(micButton);

    await waitFor(() => {
      expect(sendMessage).not.toHaveBeenCalled();
    });

    expect(setInputValue).not.toHaveBeenCalled();
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it("interrupts inference", async () => {
    mockLLM({ isGenerating: true });
    const rightChatButtons = await renderComponent("Hello3");
    const interruptButton = rightChatButtons.getByTestId("interrupt-llm-button");

    expect(interruptButton).toBeOnTheScreen();
    expect(interrupt).toHaveBeenCalledTimes(0);

    fireEvent.press(interruptButton);
    expect(interrupt).toHaveBeenCalled();
    expect(interrupt).toHaveBeenCalledTimes(1);
  });

  it("not interrupts inference", async () => {
    mockLLM({ isGenerating: true, interrupt: undefined });
    const rightChatButtons = await renderComponent("Hello3");
    const interruptButton = rightChatButtons.getByTestId("interrupt-llm-button");

    expect(interruptButton).toBeOnTheScreen();
    expect(interrupt).toHaveBeenCalledTimes(0);

    fireEvent.press(interruptButton);
    expect(interrupt).not.toHaveBeenCalled();
  });
});
