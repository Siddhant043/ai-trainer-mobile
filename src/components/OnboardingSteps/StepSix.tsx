import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import CustomPicker from "../CustomPicker";
import { DIETARY_RESTRICTIONS, FASTING_PREFERENCE, STATE } from "@/src/types";
import { STATES_MAP } from "@/src/constants";
import { useUserStore } from "@/src/store";
import { useUpdateUser } from "@/src/hooks";

const StepSix = ({ setNext }: { setNext: (step: number) => void }) => {
  const { user, setUser } = useUserStore();

  const { updateUserMutation } = useUpdateUser();
  const [dietaryRestrictions, setDietaryRestrictions] =
    useState<DIETARY_RESTRICTIONS>(
      user?.dietaryPreferences?.dietaryRestrictions || "vegetarian"
    );

  const [state, setState] = useState<STATE>(
    user?.dietaryPreferences?.state || "delhi"
  );

  const [fastingPractices, setFastingPractices] = useState<FASTING_PREFERENCE>(
    user?.dietaryPreferences?.fastingPreference || "navratri"
  );

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
    setFastingPractices(value as FASTING_PREFERENCE);
  };

  const handleNext = async () => {
    if (!user._id || !user.email) {
      // Handle case where required fields are missing
      return;
    }

    const updatedUser = {
      ...user,
      dietaryPreferences: {
        ...user?.dietaryPreferences,
        dietaryRestrictions: dietaryRestrictions,
        state: state as STATE,
        fastingPreference: fastingPractices as FASTING_PREFERENCE,
      },
      isOnboarded: true,
    };

    try {
      await updateUserMutation.mutateAsync(updatedUser);
      setUser(updatedUser);
      setNext(7); // Move to next step or complete onboarding
    } catch (error) {
      console.error("Failed to update user:", error);
    }
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

        <Button onPress={handleNext}>Next</Button>
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
