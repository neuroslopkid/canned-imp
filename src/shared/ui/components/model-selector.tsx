import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@ui/theme/colors";
import { useMemo } from "react";

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
  onSelectModel: (id: string) => void;
}

const toNumericGB = (size: string): number => {
  if (size.endsWith("B")) return parseFloat(size);
  if (size.endsWith("M")) return parseFloat(size) / 1000;
  return 0;
};

export const ModelSelector = ({
  visible,
  onClose,
  title = "Select Model",
  models,
  selectedModelId,
  onSelectModel,
}: ModelSelectorProps) => {
  const sortedModels = useMemo(() => [...models].sort((a, b) => toNumericGB(a.size) - toNumericGB(b.size)), [models]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.modelList}>
            {sortedModels.map((model) => {
              const isSelected = model.id === selectedModelId;
              return (
                <Pressable
                  key={model.id}
                  style={[styles.modelItem, isSelected && styles.modelItemSelected]}
                  onPress={() => onSelectModel(model.id)}
                >
                  <View style={styles.radioOuter}>{isSelected && <View style={styles.radioInner} />}</View>
                  <View style={styles.modelInfo}>
                    <Text style={styles.modelLabel}>{model.label}</Text>
                    <Text style={styles.modelSize}>
                      {model.fileSize ? `${model.size} · ${model.fileSize}` : model.size}
                    </Text>
                  </View>
                </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
  },
  modalTitle: {
    color: Colors.TextPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    color: Colors.Link,
    fontSize: 16,
  },
  modelList: {
    paddingHorizontal: 20,
  },
  modelItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
  },
  modelItemSelected: {
    backgroundColor: Colors.BorderXlight,
    borderRadius: 8,
    marginHorizontal: -8,
    paddingHorizontal: 8,
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
    backgroundColor: Colors.Accent,
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
