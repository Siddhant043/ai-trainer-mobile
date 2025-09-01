import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import SingleSelectOption from "../SingleSelectOption";
import { useUserStore } from "@/src/store";
import { FITNESS_GOAL } from "@/src/types";

const StepTwo = ({ setNext }: { setNext: (step: number) => void }) => {
  const { user, setUser } = useUserStore();
  const [fitnessGoal, setFitnessGoal] = useState(
    user?.exercisePreferences?.fitnessGoal || ""
  );

  const fitnessGoalMap = [
    {
      label: "🏃 Fat Loss",
      value: "fat-loss",
    },
    {
      label: "💪 Muscle Gain",
      value: "muscle-gain",
    },
    {
      label: "🏆 Endurance/Performance",
      value: "endurance",
    },
    {
      label: "⚖️ Recomposition (gain muscle, lose fat)",
      value: "recomposition",
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
        fitnessGoal: fitnessGoal as FITNESS_GOAL,
      },
    });
    setNext(3);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Fitness Goal</CustomText>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <SingleSelectOption
          options={fitnessGoalMap}
          selectedValue={fitnessGoal}
          onValueChange={setFitnessGoal}
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
  title: {
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    gap: 5,
  },
});

export default StepTwo;
