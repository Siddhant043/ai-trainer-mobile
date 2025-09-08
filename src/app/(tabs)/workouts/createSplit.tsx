import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomTextInput from "@/src/components/CustomTextInput";
import MultiSelectCustomPicker from "@/src/components/MultiSelectCustomPicker";
import Button from "@/src/components/Button";

const CreateSplit = () => {
  const [splitName, setSplitName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBackPress = useCallback(() => {
    router.replace("/(tabs)/workouts/splits");
  }, [router]);

  // Example: Days of the week options
  const dayOptions = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  const handleNext = useCallback(() => {
    console.log(splitName, selectedDays, description);
    if (!splitName || selectedDays.length === 0 || !description) {
      setError("Please fill all the fields");
      return;
    } else {
      setError("");
      router.push("/(tabs)/workouts/createSchedule");
    }
  }, [router, splitName, selectedDays, description]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
        <CustomText style={styles.title}>Create Split</CustomText>
      </View>
      <View style={styles.sliptFormContainer}>
        <CustomTextInput
          label="Split Name"
          placeholder="Enter split name"
          value={splitName}
          handleValueChange={setSplitName}
        />
        <CustomTextInput
          label="Description"
          placeholder="Enter description"
          value={description}
          handleValueChange={setDescription}
        />
        <MultiSelectCustomPicker
          label="Workout Days"
          options={dayOptions}
          selectedValues={selectedDays}
          onValueChange={setSelectedDays}
          placeholder="Select workout days"
          maxSelections={7}
        />
        {error && <CustomText style={styles.error}>{error}</CustomText>}
        <View style={styles.buttonContainer}>
          <Button onPress={handleNext}>Next</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f6f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#707070",
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  sliptFormContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    gap: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default CreateSplit;
