import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";

interface CompactFilterProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

const CompactFilter = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
}: CompactFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptionLabel = options.find(
    (option) => option.value === selectedValue
  )?.label;

  const displayText = selectedOptionLabel || placeholder;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <CustomText
          style={
            [
              styles.filterText,
              selectedValue ? styles.selectedText : styles.placeholderText,
            ] as any
          }
        >
          {displayText}
        </CustomText>
        <Ionicons
          name="chevron-down"
          size={14}
          color={selectedValue ? "#000" : "#707070"}
        />
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <CustomText style={styles.modalTitle}>
              Select {placeholder}
            </CustomText>
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => {
                onValueChange(value);
                setIsOpen(false);
              }}
            >
              <Picker.Item
                style={styles.pickerItem}
                label={`All ${placeholder}s`}
                value=""
              />
              {options.map((option) => (
                <Picker.Item
                  style={styles.pickerItem}
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  icon: {
    marginRight: 6,
  },
  filterText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "OutfitRegular",
    marginRight: 4,
  },
  selectedText: {
    color: "#007AFF",
    fontFamily: "OutfitSemiBold",
  },
  placeholderText: {
    color: "#8E8E93",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
    paddingTop: 10,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "OutfitSemiBold",
    color: "#1C1C1E",
  },
  closeButton: {
    padding: 4,
  },
  pickerWrapper: {
    width: "100%",
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: "OutfitRegular",
    color: "#1C1C1E",
  },
});

export default CompactFilter;
