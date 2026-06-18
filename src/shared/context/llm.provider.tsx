import { createContext, ReactNode, useContext, useMemo } from "react";
import { LLMType, models, useLLM } from "react-native-executorch";

const LLMContext = createContext<LLMType | null>(null);

export const LLMProvider = ({ children }: { children: ReactNode }) => {
  const llmModelConfig = useMemo(() => models.llm.smollm2_1_135m(), []);
  // const ttsModelConfig = useMemo(() => models.speech_to_text.whisper_tiny_en(), []);

  const llm = useLLM({
    model: llmModelConfig,
  });

  // const tts = useSpeechToText({
  //   model: ttsModelConfig,
  // });

  return <LLMContext.Provider value={llm}>{children}</LLMContext.Provider>;
};

export const useLLMModels = () => {
  const context = useContext(LLMContext);

  return context;
};
