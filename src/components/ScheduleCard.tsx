import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import Button from "./Button";
import { Ionicons } from "@expo/vector-icons";

const ScheduleCard = ({
  scheduleDetails,
  isCardOpen = false,
}: {
  scheduleDetails: { name: string; exercises: string[] };
  isCardOpen?: boolean;
}) => {
  // Split exercises into two columns
  const leftColumn = scheduleDetails.exercises.slice(
    0,
    scheduleDetails.exercises.length / 2
  );
  const rightColumn = scheduleDetails.exercises.slice(
    scheduleDetails.exercises.length / 2
  );

  const [isExpanded, setIsExpanded] = useState(isCardOpen);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>{scheduleDetails.name}</CustomText>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#707070"
          />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.exercisesContainer, !isExpanded && { display: "none" }]}
      >
        <View style={styles.column}>
          {leftColumn.map((exercise, index) => (
            <View key={index} style={styles.exerciseRow}>
              <View style={styles.bullet} />
              <CustomText style={styles.exercise}>{exercise}</CustomText>
            </View>
          ))}
        </View>

        <View style={styles.column}>
          {rightColumn.map((exercise, index) => (
            <View key={index + 4} style={styles.exerciseRow}>
              <View style={styles.bullet} />
              <CustomText style={styles.exercise}>{exercise}</CustomText>
            </View>
          ))}
        </View>
      </View>
      <View
        style={[styles.buttonContainer, !isExpanded && { display: "none" }]}
      >
        <Button onPress={() => {}}>Start</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "OutfitRegular",
    color: "#000",
  },
  buttonContainer: {
    marginTop: 20,
  },

  exercisesContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    paddingRight: 10,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#707070",
    marginRight: 12,
  },
  exercise: {
    fontSize: 16,
    color: "#707070",
    fontFamily: "OutfitRegular",
    flex: 1,
  },
});

export default ScheduleCard;
