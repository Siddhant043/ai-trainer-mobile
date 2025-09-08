import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectCustomPickerProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
  label: string;
  placeholder?: string;
  maxSelections?: number;
}

const MultiSelectCustomPicker = ({
  options,
  selectedValues,
  onValueChange,
  label,
  placeholder = "Select options",
  maxSelections,
}: MultiSelectCustomPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOption = (value: string) => {
    const isSelected = selectedValues.includes(value);

    if (isSelected) {
      // Remove from selection
      onValueChange(selectedValues.filter((v) => v !== value));
    } else {
      // Add to selection (check max limit)
      if (!maxSelections || selectedValues.length < maxSelections) {
        onValueChange([...selectedValues, value]);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      // Deselect all
      onValueChange([]);
    } else {
      // Select all (respect max limit)
      const valuesToSelect = maxSelections
        ? options.slice(0, maxSelections).map((option) => option.value)
        : options.map((option) => option.value);
      onValueChange(valuesToSelect);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }

    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    }

    if (selectedValues.length === options.length) {
      return "All selected";
    }

    return `${selectedValues.length} selected`;
  };

  const isAllSelected = selectedValues.length === options.length;
  const isPartiallySelected =
    selectedValues.length > 0 && selectedValues.length < options.length;

  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>

      <TouchableOpacity
        style={styles.selectedValueContainer}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <CustomText
          style={
            selectedValues.length === 0
              ? styles.placeholderText
              : styles.selectedValue
          }
        >
          {getDisplayText()}
        </CustomText>
        <Ionicons name="chevron-down" size={24} color="#707070" />
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
          <View style={styles.header}>
            <CustomText style={styles.headerTitle}>{label}</CustomText>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}
            >
              <CustomText style={styles.closeButtonText}>✕</CustomText>
            </TouchableOpacity>
          </View>

          {options.length > 1 && (
            <TouchableOpacity
              style={[
                styles.optionItem,
                styles.selectAllItem,
                isAllSelected && styles.selectedOption,
                isPartiallySelected && styles.partiallySelectedOption,
              ]}
              onPress={handleSelectAll}
            >
              <CustomText
                style={
                  isAllSelected || isPartiallySelected
                    ? styles.selectedOptionText
                    : styles.optionText
                }
              >
                {isAllSelected ? "Deselect All" : "Select All"}
              </CustomText>
              {(isAllSelected || isPartiallySelected) && (
                <CustomText style={styles.checkmark}>✓</CustomText>
              )}
            </TouchableOpacity>
          )}

          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              const isDisabled =
                !isSelected &&
                maxSelections &&
                selectedValues.length >= maxSelections;

              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionItem,
                    isSelected ? styles.selectedOption : undefined,
                    isDisabled ? styles.disabledOption : undefined,
                  ]}
                  onPress={() =>
                    !isDisabled && handleToggleOption(option.value)
                  }
                  disabled={!!isDisabled}
                >
                  <CustomText
                    style={
                      isSelected
                        ? styles.selectedOptionText
                        : isDisabled
                        ? styles.disabledOptionText
                        : styles.optionText
                    }
                  >
                    {option.label}
                  </CustomText>
                  {isSelected && (
                    <CustomText style={styles.checkmark}>✓</CustomText>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setIsOpen(false)}
            >
              <CustomText style={styles.doneButtonText}>Done</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "#707070",
  },
  selectedValueContainer: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#EDEDED",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  selectedValue: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
    flex: 1,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#707070",
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: "#707070",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 20,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#707070",
  },
  selectAllItem: {
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionsContainer: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: "#E3F2FD",
  },
  partiallySelectedOption: {
    backgroundColor: "#FFF3E0",
  },
  disabledOption: {
    backgroundColor: "#F5F5F5",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  selectedOptionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    flex: 1,
  },
  disabledOptionText: {
    fontSize: 16,
    color: "#707070",
    flex: 1,
  },
  checkmark: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  doneButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MultiSelectCustomPicker;
