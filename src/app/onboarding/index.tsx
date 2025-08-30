import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressHeader from "@/src/components/OnboardingHeader";
import StepOne from "@/src/components/OnboardingSteps/StepOne";
import StepTwo from "@/src/components/OnboardingSteps/StepTwo";
import StepThree from "@/src/components/OnboardingSteps/StepThree";
import StepFour from "@/src/components/OnboardingSteps/StepFour";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const stepMapping = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne setStep={setStep} />;
      case 2:
        return <StepTwo setStep={setStep} />;
      case 3:
        return <StepThree setStep={setStep} />;
      case 4:
        return <StepFour setStep={setStep} />;
      default:
        return <StepOne setStep={setStep} />;
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {step > 1 ? (
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            onPress={handleBack}
          />
        ) : (
          <View />
        )}
        <ProgressHeader currentStep={step} />
        <View />
      </View>
      {stepMapping(step)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "regular",
  },
  step: {
    fontSize: 16,
    fontWeight: "regular",
  },
});

export default Onboarding;
