import { useEffect } from "react";
import { useLLMModels } from "@context/llm.provider";

const GENERATION_WATCHDOG_TIMEOUT_MS = 60_000;

export const useStuckGenerationWatchdog = (timeoutMs: number = GENERATION_WATCHDOG_TIMEOUT_MS) => {
  const { llm } = useLLMModels();

  useEffect(() => {
    if (!llm?.isGenerating) {
      return;
    }

    const timer = setTimeout(() => {
      if (llm?.isGenerating) {
        llm.interrupt?.();
      }
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [llm?.isGenerating, timeoutMs]);
};
