import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressHeader = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 6;

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentStep;

        return (
          <React.Fragment key={step}>
            {/* Dot */}
            <View
              style={[
                styles.dot,
                { backgroundColor: isActive ? "#000" : "#ccc" },
              ]}
            />

            {/* Line (don’t show after last dot) */}
            {step < totalSteps && (
              <View
                style={[
                  styles.line,
                  { backgroundColor: step < currentStep ? "#000" : "#ccc" },
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  line: {
    height: 2,
    width: 30,
  },
});

export default ProgressHeader;
