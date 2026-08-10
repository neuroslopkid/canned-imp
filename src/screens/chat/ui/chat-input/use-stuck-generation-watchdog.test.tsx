jest.mock("@context/llm.provider", () => ({
  useLLMModels: jest.fn(),
}));

import { act, renderHook } from "@testing-library/react-native";
import { useLLMModels } from "@context/llm.provider";
import { useStuckGenerationWatchdog } from "./use-stuck-generation-watchdog";

const interrupt = jest.fn();

const baseLLM = {
  isGenerating: true,
  interrupt,
};

const mockLLM = (overrides: Partial<typeof baseLLM> = {}) => {
  (useLLMModels as jest.Mock).mockReturnValue({
    llm: { ...baseLLM, ...overrides },
    selectedModelId: "smollm2_1_135m",
    availableModels: [],
    openModelPicker: jest.fn(),
  });
};

describe("useStuckGenerationWatchdog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("interrupts generation that stays stuck past the timeout", async () => {
    mockLLM();
    await renderHook<void, void>(() => useStuckGenerationWatchdog());

    await act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(interrupt).toHaveBeenCalledTimes(1);
  });

  it("does not arm a timer when not generating", async () => {
    mockLLM({ isGenerating: false });
    await renderHook<void, void>(() => useStuckGenerationWatchdog());

    await act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(interrupt).not.toHaveBeenCalled();
  });

  it("does not interrupt when generation finishes before the timeout", async () => {
    mockLLM();
    const { rerender } = await renderHook<void, void>(() => useStuckGenerationWatchdog());

    mockLLM({ isGenerating: false });
    await rerender();

    await act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(interrupt).not.toHaveBeenCalled();
  });

  it("does not throw when interrupt is unavailable", async () => {
    mockLLM({ interrupt: undefined });
    await renderHook<void, void>(() => useStuckGenerationWatchdog());

    await act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(interrupt).not.toHaveBeenCalled();
  });
});
