import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import SingleSelectOption from "../SingleSelectOption";
import { useUserStore } from "@/src/store";

const StepThree = ({ setNext }: { setNext: (step: number) => void }) => {
  const { user, setUser } = useUserStore();
  const [experienceLevel, setExperienceLevel] = useState(
    user?.exercisePreferences?.experienceLevel || ""
  );
  const experienceLevelMap = [
    {
      label: "🏋️ Beginner (0–12 months)",
      value: "beginner",
    },
    {
      label: "💪 Intermediate (1–3 years)",
      value: "intermediate",
    },
    {
      label: "🥇 Advanced (3+ years)",
      value: "advanced",
    },
  ];

  const handleNext = () => {
    if (!user?.id || !user?.email) {
      // Handle case where required fields are missing
      return;
    }
    setUser({
      ...user,
      exercisePreferences: {
        ...user?.exercisePreferences,
        experienceLevel: experienceLevel,
      },
    });
    setNext(4);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Experience Level</CustomText>
        <CustomText style={styles.subtitle}>
          Note: Select 'beginner' if you have not trained continuously for one
          year.
        </CustomText>
      </View>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <SingleSelectOption
          options={experienceLevelMap}
          selectedValue={experienceLevel}
          onValueChange={setExperienceLevel}
        />
        <Button onPress={handleNext}>Next</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 5,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#707070",
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    gap: 5,
  },
});

export default StepThree;
