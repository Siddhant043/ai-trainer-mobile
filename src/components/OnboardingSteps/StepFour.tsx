import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import CustomText from "../CustomText";

import Button from "../Button";
import SingleSelectOption from "../SingleSelectOption";

const StepFour = ({ setStep }: { setStep: (step: number) => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Lifestyle & Availability</CustomText>
      </View>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
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

export default StepFour;
