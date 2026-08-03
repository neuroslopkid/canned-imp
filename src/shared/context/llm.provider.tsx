import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LLMType, models, useLLM } from "react-native-executorch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModelSelector, ModelItem } from "@ui/components/model-selector";
import { getDownloadedModelIds } from "@utils";

const LLM_SELECTED_MODEL_KEY = "selectedLlmModel";
const AUTOLOAD_ENABLED_KEY = "autoloadEnabled";

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
  downloadedModelIds: Set<string>;
  openModelPicker: () => void;
}

const LLMContext = createContext<LLMContextType>({
  llm: null,
  selectedModelId: null,
  availableModels: AVAILABLE_MODELS,
  downloadedModelIds: new Set(),
  openModelPicker: () => {},
});

export const LLMProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [preventLoad, setPreventLoad] = useState(true);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [downloadedModelIds, setDownloadedModelIds] = useState<Set<string>>(new Set());
  const [autoloadEnabled, setAutoloadEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const [saved, autoload, downloaded] = await Promise.all([
        AsyncStorage.getItem(LLM_SELECTED_MODEL_KEY),
        AsyncStorage.getItem(AUTOLOAD_ENABLED_KEY),
        getDownloadedModelIds(AVAILABLE_MODELS),
      ]);
      setDownloadedModelIds(downloaded);
      setAutoloadEnabled(autoload === "true");

      if (saved) {
        setSelectedModelId(saved);

        if (autoload === "true" && AVAILABLE_MODELS.some((m) => m.id === saved)) {
          setPreventLoad(false);
        }
      }
    })();
  }, []);

  const modelConfig = useMemo(() => {
    const entry = AVAILABLE_MODELS.find((m) => m.id === selectedModelId);

    return entry?.accessor() ?? models.llm.smollm2_1_135m();
  }, [selectedModelId]);

  const llm = useLLM({
    model: modelConfig,
    preventLoad,
  });

  const loadModel = useCallback((id: string) => {
    AsyncStorage.setItem(LLM_SELECTED_MODEL_KEY, id);
    setSelectedModelId(id);
    setPreventLoad(false);
  }, []);

  const handleSelectModel = useCallback(
    (id: string) => {
      loadModel(id);
      setPickerVisible(false);
    },
    [loadModel],
  );

  const handleToggleAutoload = useCallback(
    (enabled: boolean, pendingModelId: string | null) => {
      AsyncStorage.setItem(AUTOLOAD_ENABLED_KEY, enabled ? "true" : "false");
      setAutoloadEnabled(enabled);

      if (enabled) {
        const id = pendingModelId ?? selectedModelId;

        if (id && AVAILABLE_MODELS.some((m) => m.id === id)) {
          loadModel(id);
        }
      }
    },
    [selectedModelId, loadModel],
  );

  const openModelPicker = useCallback(() => setPickerVisible(true), []);
  const closeModelPicker = useCallback(() => setPickerVisible(false), []);

  const contextValue = useMemo(
    () => ({
      llm: selectedModelId ? llm : null,
      selectedModelId,
      availableModels: AVAILABLE_MODELS,
      downloadedModelIds,
      openModelPicker,
    }),
    [llm, selectedModelId, downloadedModelIds, openModelPicker],
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
        downloadedModelIds={downloadedModelIds}
        autoloadEnabled={autoloadEnabled}
        onToggleAutoload={handleToggleAutoload}
        onSelectModel={handleSelectModel}
      />
    </LLMContext.Provider>
  );
};

export const useLLMModels = () => {
  const context = useContext(LLMContext);

  return context;
};
