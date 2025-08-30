import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./CustomText";

const SingleSelectOption = ({
  options,
  selectedValue,
  onValueChange,
}: {
  options: any[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          style={[
            selectedValue === option.value
              ? styles.selectedOption
              : styles.option,
          ]}
          activeOpacity={0.8}
          key={option.value}
          onPress={() => onValueChange(option.value)}
        >
          <CustomText style={styles.optionText}>{option.label}</CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    marginBottom: 40,
  },
  option: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 56,
    borderColor: "#CACACA",
    width: "100%",
    textAlign: "center",
  },
  selectedOption: {
    borderColor: "#000",
    borderWidth: 2,
    color: "#fff",
    width: "100%",
    padding: 10,
    height: 56,
    borderRadius: 10,
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SingleSelectOption;
