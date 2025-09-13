import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import Button from "./Button";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Exercise } from "@/src/types";
import { useDeleteSchedule } from "@/src/hooks/useSchedule";
import { useRouter } from "expo-router";

const ScheduleCard = ({
  scheduleDetails,
  isCardOpen = false,
  isActivityCard = false,
}: {
  scheduleDetails: {
    _id: string;
    name: string;
    description: string;
    exercises: Partial<Exercise>[];
    days?: string[];
    workoutId: string;
  };
  isCardOpen?: boolean;
  isActivityCard?: boolean;
}) => {
  const { deleteSchedule, isPending, error } = useDeleteSchedule();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // Split exercises into two columns
  let leftColumn = scheduleDetails.exercises.slice(
    0,
    scheduleDetails.exercises.length / 2
  );
  let rightColumn = scheduleDetails.exercises.slice(
    scheduleDetails.exercises.length / 2
  );

  if (scheduleDetails.exercises.length % 2 !== 0) {
    leftColumn = scheduleDetails.exercises.slice(
      0,
      scheduleDetails.exercises.length / 2 + 1
    );
    rightColumn = scheduleDetails.exercises.slice(
      scheduleDetails.exercises.length / 2 + 1
    );
  }

  const days = scheduleDetails?.days || [];

  const [isExpanded, setIsExpanded] = useState(isCardOpen);

  const handleDeleteSchedule = async () => {
    Alert.alert(
      "Delete Schedule",
      "Are you sure you want to delete this schedule?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteSchedule(scheduleDetails._id);
            setIsDeleting(false);
          },
          style: "destructive",
        },
      ]
    );
    if (isPending) {
      setIsDeleting(true);
      return;
    }
    if (error) {
      setIsDeleting(false);
      return;
    }
    setIsDeleting(false);
  };

  const handleEditSchedule = () => {
    router.push(
      `/workouts/createSchedule/${scheduleDetails.workoutId}?scheduleId=${scheduleDetails._id}`
    );
  };

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
        style={[
          styles.descriptionContainer,
          !isExpanded && { display: "none" },
        ]}
      >
        <CustomText style={styles.description}>
          {scheduleDetails.description}
        </CustomText>
        <CustomText style={styles.days}>
          Active Days: {days.join(", ")}
        </CustomText>
      </View>

      <View
        style={[styles.exercisesContainer, !isExpanded && { display: "none" }]}
      >
        <View style={styles.column}>
          {leftColumn.map((exercise, index) => (
            <View key={index} style={styles.exerciseRow}>
              <View style={styles.bullet} />
              <CustomText style={styles.exercise}>
                {exercise.exerciseName}
              </CustomText>
            </View>
          ))}
        </View>

        <View style={styles.column}>
          {rightColumn.map((exercise, index) => (
            <View key={index + 4} style={styles.exerciseRow}>
              <View style={styles.bullet} />
              <CustomText style={styles.exercise}>
                {exercise.exerciseName}
              </CustomText>
            </View>
          ))}
        </View>
      </View>
      {isActivityCard ? (
        <View
          style={[styles.buttonContainer, !isExpanded && { display: "none" }]}
        >
          <Button onPress={() => {}}>Start</Button>
        </View>
      ) : (
        <View
          style={[
            styles.utilitiesContainer,
            !isExpanded && { display: "none" },
          ]}
        >
          <TouchableOpacity onPress={handleDeleteSchedule}>
            <Feather name="trash-2" size={24} color="#EA2929" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditSchedule}>
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
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
  descriptionContainer: {
    flexDirection: "column",
    gap: 5,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#707070",
  },
  days: {
    fontSize: 16,
    color: "#707070",
  },
  buttonContainer: {
    marginTop: 20,
  },
  utilitiesContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#707070",
    marginRight: 12,
    marginTop: 8,
  },
  exercise: {
    fontSize: 16,
    color: "#707070",
    fontFamily: "OutfitRegular",
    flex: 1,
  },
});

export default ScheduleCard;
