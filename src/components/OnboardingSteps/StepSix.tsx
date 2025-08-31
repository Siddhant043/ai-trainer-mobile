import { View, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import CustomPicker from "../CustomPicker";
import { STATE } from "@/src/types";
import { STATES_MAP } from "@/src/constants";

const StepSix = ({ setNext }: { setNext: (step: number) => void }) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState<
    | "vegetarian"
    | "vegan"
    | "non-vegetarian"
    | "gluten-free"
    | "lactose-free"
    | "other"
    | "none"
  >("vegetarian");

  const [state, setState] = useState<STATE>("delhi");

  const [fastingPractices, setFastingPractices] = useState<string>("navratri");

  const dietaryRestrictionsOptions = [
    {
      label: "Vegetarian",
      value: "vegetarian",
    },
    {
      label: "Vegan",
      value: "vegan",
    },
    {
      label: "Non-Vegetarian",
      value: "non-vegetarian",
    },
    {
      label: "Gluten-Free",
      value: "gluten-free",
    },
    {
      label: "Lactose-Free",
      value: "lactose-free",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const statesOptions = STATES_MAP;

  const fastingPracticcesOptions = [
    {
      label: "Navtatri",
      value: "navratri",
    },
    {
      label: "Ramdaan",
      value: "ramadan",
    },
    {
      label: "Other",
      value: "other-fasting-practices",
    },
  ];

  const handleDietaryRestrictionsChange = (value: string) => {
    setDietaryRestrictions(
      value as
        | "vegetarian"
        | "vegan"
        | "non-vegetarian"
        | "gluten-free"
        | "lactose-free"
        | "other"
        | "none"
    );
  };

  const handleStateChange = (value: string) => {
    setState(value as STATE);
  };

  const handleFastingPracticesChange = (value: string) => {
    setFastingPractices(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Dietary Preferences</CustomText>
      </View>
      <View style={styles.formContainer}>
        <CustomPicker
          options={dietaryRestrictionsOptions}
          selectedValue={dietaryRestrictions}
          onValueChange={handleDietaryRestrictionsChange}
          label="Dietary Restrictions"
        />
        <CustomPicker
          options={statesOptions}
          selectedValue={state}
          onValueChange={handleStateChange}
          label="State"
        />
        <CustomPicker
          options={fastingPracticcesOptions}
          selectedValue={fastingPractices}
          onValueChange={handleFastingPracticesChange}
          label="Fasting Practices"
        />

        <Button onPress={() => setNext(7)}>Next</Button>
      </View>
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
    gap: 10,
  },
});

export default StepSix;
