import RNDatePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "./CustomText";

const CustomDatePicker = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>Date of Birth</CustomText>
      <View style={styles.datePickerWrapper}>
        <RNDatePicker
          maximumDate={new Date()}
          minimumDate={new Date(1920, 1, 1)}
          mode="date"
          value={date}
          display="default"
          onChange={(event, selectedDate) => {
            setDate(selectedDate ?? new Date());
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    color: "#707070",
  },
  datePickerWrapper: {
    width: "100%",
    height: 55,
    borderRadius: 8,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 5,
    overflow: "hidden",
  },
});

export default CustomDatePicker;
