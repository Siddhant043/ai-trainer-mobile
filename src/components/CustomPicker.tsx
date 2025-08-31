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

const CustomPicker = ({
  options,
  selectedValue,
  onValueChange,
  label,
}: {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptionLabel = options.find(
    (option) => option.value === selectedValue
  )?.label;

  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>

      <TouchableOpacity
        style={styles.selectedValueContainer}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <CustomText style={styles.selectedValue}>
          {selectedOptionLabel}
        </CustomText>
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
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => {
                onValueChange(value);
                setIsOpen(false);
              }}
            >
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
    justifyContent: "center",
    alignItems: "flex-start",
  },
  selectedValue: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
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
    paddingTop: 10,
  },
  pickerWrapper: {
    width: "100%",
  },
  pickerItem: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
  },
});

export default CustomPicker;
