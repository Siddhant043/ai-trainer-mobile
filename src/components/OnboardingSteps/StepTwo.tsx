import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import SingleSelectOption from "../SingleSelectOption";

const StepTwo = ({ setStep }: { setStep: (step: number) => void }) => {
  const [fitnessGoal, setFitnessGoal] = useState("");
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
        <Button onPress={() => setStep(3)}>Next</Button>
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
