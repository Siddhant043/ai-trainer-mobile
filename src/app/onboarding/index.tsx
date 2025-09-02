import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProgressHeader from "@/src/components/OnboardingHeader";
import StepOne from "@/src/components/OnboardingSteps/StepOne";
import StepTwo from "@/src/components/OnboardingSteps/StepTwo";
import StepThree from "@/src/components/OnboardingSteps/StepThree";
import StepFour from "@/src/components/OnboardingSteps/StepFour";
import StepFive from "@/src/components/OnboardingSteps/StepFive";
import StepSix from "@/src/components/OnboardingSteps/StepSix";
import { useUserStore } from "@/src/store";
import { RelativePathString, useRouter } from "expo-router";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user.isOnboarded) {
      router.navigate("/(tabs)" as RelativePathString);
    }
  }, [user.isOnboarded]);

  const stepMapping = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne setNext={setStep} />;
      case 2:
        return <StepTwo setNext={setStep} />;
      case 3:
        return <StepThree setNext={setStep} />;
      case 4:
        return <StepFour setNext={setStep} />;
      case 5:
        return <StepFive setNext={setStep} />;
      case 6:
        return <StepSix setNext={setStep} />;
      default:
        return <StepOne setNext={setStep} />;
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
    padding: 20,
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
