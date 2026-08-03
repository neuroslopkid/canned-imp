import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@ui/theme/colors";
import { useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export interface ModelItem {
  id: string;
  label: string;
  size: string;
  fileSize?: string;
}

interface ModelSelectorProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  models: ModelItem[];
  selectedModelId: string | null;
  downloadedModelIds: Set<string>;
  autoloadEnabled: boolean;
  onToggleAutoload: (enabled: boolean, modelId: string | null) => void;
  onSelectModel: (id: string) => void;
}

const toNumericGB = (size: string): number => {
  if (size.endsWith("B")) {
    return parseFloat(size);
  }
  if (size.endsWith("M")) {
    return parseFloat(size) / 1000;
  }

  return 0;
};

export const ModelSelector = ({
  visible,
  onClose,
  title = "Select Model",
  models,
  selectedModelId,
  downloadedModelIds,
  autoloadEnabled,
  onToggleAutoload,
  onSelectModel,
}: ModelSelectorProps) => {
  const sortedModels = useMemo(() => [...models].sort((a, b) => toNumericGB(a.size) - toNumericGB(b.size)), [models]);
  const [modelId, setModelId] = useState(selectedModelId);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={styles.modalButtonWrapper}>
              <Pressable
                style={{ borderWidth: 1, borderColor: Colors.Primary, padding: 5, borderRadius: 5 }}
                onPress={() => modelId && onSelectModel(modelId)}
              >
                <Text style={styles.confirmButton}>Confirm</Text>
              </Pressable>
              <Pressable style={styles.autoloadButton} onPress={() => onToggleAutoload(!autoloadEnabled, modelId)}>
                <Ionicons
                  name={autoloadEnabled ? "checkbox" : "square-outline"}
                  size={20}
                  color={autoloadEnabled ? Colors.Link : Colors.TextSecondary}
                />
                <Text style={styles.autoloadLabel}>Autoload</Text>
              </Pressable>
              <Pressable onPress={onClose}>
                <Text style={styles.closeButton}>Close</Text>
              </Pressable>
            </View>
          </View>
          <ScrollView style={styles.modelList} contentContainerStyle={{ justifyContent: "space-between", rowGap: 2 }}>
            {sortedModels.map((model) => {
              const isSelected = model.id === modelId;
              const isActive = model.id === selectedModelId;

              return (
                <React.Fragment key={model.id}>
                  <Pressable
                    style={[styles.modelItem, isSelected && styles.modelItemSelected, isActive && styles.modelActive]}
                    onPress={() => setModelId(model.id)}
                  >
                    <View style={styles.radioOuter}>{isSelected && <View style={styles.radioInner} />}</View>
                    <View style={styles.modelInfo}>
                      <Text style={styles.modelLabel}>{model.label}</Text>
                      {downloadedModelIds.has(model.id) ? (
                        <Ionicons name="checkmark" size={18} color={Colors.Success} />
                      ) : (
                        <Text style={styles.modelSize}>
                          {model.fileSize ? `${model.size} · ${model.fileSize}` : model.size}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                  <View
                    key={`${model.id}-separator`}
                    style={{ width: "100%", height: 1, backgroundColor: Colors.BorderXlight, borderRadius: 40 }}
                  ></View>
                </React.Fragment>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.BackgroundPrimary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 54,
  },
  modalHeader: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
  },
  modalButtonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    color: Colors.TextPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  confirmButton: {
    color: Colors.Secondary,
    fontSize: 16,
  },
  closeButton: {
    color: Colors.Danger,
    fontSize: 16,
  },
  autoloadButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    padding: 5,
  },
  autoloadLabel: {
    color: Colors.TextPrimary,
    fontSize: 16,
  },
  modelList: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  modelItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },
  modelItemSelected: {
    borderWidth: 2,
    margin: -2,
    borderColor: Colors.BorderXheavy,
    borderStyle: "dotted",
    backgroundColor: Colors.BorderXlight,
  },
  modelActive: {
    backgroundColor: Colors.BorderLight,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.TextSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.TextPrimary,
  },
  modelInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  modelLabel: {
    color: Colors.TextPrimary,
    fontSize: 16,
  },
  modelSize: {
    color: Colors.TextTertiary,
    fontSize: 14,
  },
});
