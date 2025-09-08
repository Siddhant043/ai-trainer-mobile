import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/src/components/CustomText";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";
import MultiSelectCustomPicker from "@/src/components/MultiSelectCustomPicker";

const CreateSchedule = () => {
  const router = useRouter();
  const [scheduleName, setScheduleName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleBackPress = useCallback(() => {
    router.replace("/(tabs)/workouts/createSplit");
  }, [router]);

  const handleNext = useCallback(() => {
    if (!scheduleName || !description) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    router.push("/(tabs)/workouts/selectExercises");
  }, [router, scheduleName, description]);

  const dayOptions = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
        <CustomText style={styles.title}>Create Schedule</CustomText>
      </View>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomTextInput
          label="Schedule Name"
          placeholder="Enter schedule name"
          value={scheduleName}
          handleValueChange={setScheduleName}
        />
        <CustomTextInput
          label="Description"
          placeholder="Enter description"
          value={description}
          handleValueChange={setDescription}
        />
        <MultiSelectCustomPicker
          label="Schedule Days (Optional)"
          options={dayOptions}
          selectedValues={selectedDays}
          onValueChange={setSelectedDays}
          placeholder="Select schedule days"
          maxSelections={7}
        />
        {error && <CustomText style={styles.error}>{error}</CustomText>}
        <Button onPress={handleNext}>Next</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f6f6",
    padding: 10,
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
  formContainer: {
    flex: 1,
    marginTop: 20,
    gap: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default CreateSchedule;
