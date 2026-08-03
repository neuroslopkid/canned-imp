import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LLMType, models, useLLM } from "react-native-executorch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModelSelector, ModelItem } from "@ui/components/model-selector";

const LLM_SELECTED_MODEL_KEY = "selectedLlmModel";

const AVAILABLE_MODELS: (ModelItem & { accessor: () => any })[] = [
  {
    id: "smollm2_1_135m",
    label: "SmolLM2",
    size: "135M",
    fileSize: "~70 MB",
    accessor: () => models.llm.smollm2_1_135m(),
  },
  { id: "lfm2_5_350m", label: "LFM 2.5", size: "350M", fileSize: "~175 MB", accessor: () => models.llm.lfm2_5_350m() },
  {
    id: "smollm2_1_360m",
    label: "SmolLM2",
    size: "360M",
    fileSize: "~180 MB",
    accessor: () => models.llm.smollm2_1_360m(),
  },
  {
    id: "qwen2_5_0_5b",
    label: "Qwen 2.5",
    size: "0.5B",
    fileSize: "~250 MB",
    accessor: () => models.llm.qwen2_5_0_5b(),
  },
  { id: "qwen3_0_6b", label: "Qwen 3", size: "0.6B", fileSize: "~300 MB", accessor: () => models.llm.qwen3_0_6b() },
  { id: "llama3_2_1b", label: "Llama 3.2", size: "1B", fileSize: "~500 MB", accessor: () => models.llm.llama3_2_1b() },
  {
    id: "lfm2_5_1_2b_instruct",
    label: "LFM 2.5 Instruct",
    size: "1.2B",
    fileSize: "~600 MB",
    accessor: () => models.llm.lfm2_5_1_2b_instruct(),
  },
  {
    id: "qwen2_5_1_5b",
    label: "Qwen 2.5",
    size: "1.5B",
    fileSize: "~750 MB",
    accessor: () => models.llm.qwen2_5_1_5b(),
  },
  {
    id: "smollm2_1_1_7b",
    label: "SmolLM2",
    size: "1.7B",
    fileSize: "~850 MB",
    accessor: () => models.llm.smollm2_1_1_7b(),
  },
  { id: "llama3_2_3b", label: "Llama 3.2", size: "3B", fileSize: "~1.5 GB", accessor: () => models.llm.llama3_2_3b() },
  {
    id: "phi_4_mini_4b",
    label: "Phi-4 Mini",
    size: "4B",
    fileSize: "~2 GB",
    accessor: () => models.llm.phi_4_mini_4b(),
  },
];

interface LLMContextType {
  llm: LLMType | null;
  selectedModelId: string | null;
  availableModels: ModelItem[];
  openModelPicker: () => void;
}

const LLMContext = createContext<LLMContextType>({
  llm: null,
  selectedModelId: null,
  availableModels: AVAILABLE_MODELS,
  openModelPicker: () => {},
});

export const LLMProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [preventLoad, setPreventLoad] = useState(true);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(LLM_SELECTED_MODEL_KEY).then((saved) => {
      if (saved) {
        setSelectedModelId(saved);
      }
    });
  }, []);

  const modelConfig = useMemo(() => {
    const entry = AVAILABLE_MODELS.find((m) => m.id === selectedModelId);

    return entry?.accessor() ?? models.llm.smollm2_1_135m();
  }, [selectedModelId]);

  const llm = useLLM({
    model: modelConfig,
    preventLoad,
  });

  const handleSelectModel = useCallback((id: string) => {
    AsyncStorage.setItem(LLM_SELECTED_MODEL_KEY, id);
    setSelectedModelId(id);
    setPreventLoad(false);
    setPickerVisible(false);
  }, []);

  const openModelPicker = useCallback(() => setPickerVisible(true), []);
  const closeModelPicker = useCallback(() => setPickerVisible(false), []);

  const contextValue = useMemo(
    () => ({
      llm: selectedModelId ? llm : null,
      selectedModelId,
      availableModels: AVAILABLE_MODELS,
      openModelPicker,
    }),
    [llm, selectedModelId, openModelPicker],
  );

  return (
    <LLMContext.Provider value={contextValue}>
      {children}
      <ModelSelector
        visible={pickerVisible}
        onClose={closeModelPicker}
        title="Select LLM Model"
        models={AVAILABLE_MODELS}
        selectedModelId={selectedModelId}
        onSelectModel={handleSelectModel}
      />
    </LLMContext.Provider>
  );
};

export const useLLMModels = () => {
  const context = useContext(LLMContext);

  return context;
};
