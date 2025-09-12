import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { useRouter } from "expo-router";
import Schedule from "../types/schedule";
import { useToggleWorkoutActiveStatus } from "../hooks/useWorkout";
import { useWorkoutStore } from "../store";

const SplitCard = ({
  isCardOpen = false,
  splitDetails,
}: {
  isCardOpen?: boolean;
  splitDetails: {
    _id: string;
    name: string;
    active?: boolean;
    schedules?: Schedule[];
  };
}) => {
  const [open, setOpen] = useState(isCardOpen);
  const { workouts } = useWorkoutStore();
  const activeWorkouts = workouts.filter((workout) => workout.active);
  const { toggleWorkoutActiveStatus } = useToggleWorkoutActiveStatus();

  const handleToggleWorkoutActiveStatus = async () => {
    if (activeWorkouts.length > 0) {
      activeWorkouts.forEach(async (workout) => {
        await toggleWorkoutActiveStatus(workout._id);
      });
    }
    await toggleWorkoutActiveStatus(splitDetails._id);
  };
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.title}>{splitDetails.name}</CustomText>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setOpen(!open)}>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={20}
            color="#707070"
          />
        </TouchableOpacity>
      </View>

      {open && (
        <>
          <View style={styles.exercisesContainer}>
            {splitDetails.schedules && splitDetails.schedules.length > 0 ? (
              splitDetails.schedules.map((schedule, index) => (
                <View style={styles.exerciseContainer} key={index * 2}>
                  <Ionicons name="ellipse" size={6} color="#707070" />
                  <CustomText style={styles.exercise}>
                    {schedule.name}
                  </CustomText>
                </View>
              ))
            ) : (
              <CustomText style={styles.exercise}>No schedules</CustomText>
            )}
          </View>

          <View style={styles.bottomContainer}>
            <Pressable
              onPress={() =>
                router.push(`/workouts/viewWorkoutSplit/${splitDetails._id}`)
              }
            >
              <CustomText style={styles.viewMore}>View More</CustomText>
            </Pressable>
            {!splitDetails.active ? (
              <Button onPress={handleToggleWorkoutActiveStatus} size="small">
                Activate
              </Button>
            ) : (
              <TouchableOpacity
                activeOpacity={0.1}
                onPress={handleToggleWorkoutActiveStatus}
              >
                <CustomText style={styles.active}>Active</CustomText>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#707070",
  },
  exercisesContainer: {
    flexDirection: "column",
    marginTop: 10,
    gap: 10,
  },
  exerciseContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  exercise: {
    fontSize: 16,
    color: "#707070",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  viewMore: {
    fontSize: 16,
  },
  active: {
    fontSize: 16,
    color: "#19CE1F",
    fontFamily: "OutfitSemiBold",
  },
});

export default SplitCard;
