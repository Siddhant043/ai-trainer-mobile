import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useWorkoutStore from "@/src/store/workoutStore";
import { Feather, Ionicons } from "@expo/vector-icons";
import CustomText from "@/src/components/CustomText";
import Schedule from "@/src/types/schedule";
import Button from "@/src/components/Button";
import { useDeleteWorkout } from "@/src/hooks/useWorkout";
import ScheduleCard from "@/src/components/ScheduleCard";

const WorkoutDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { workouts } = useWorkoutStore();
  const { deleteWorkout, isPending, error } = useDeleteWorkout();
  const workout = workouts && workouts.find((workout) => workout._id === id);
  const capitalizedWrokoutDays = workout?.workoutDays
    ?.map((day) => day.charAt(0).toUpperCase() + day.slice(1))
    .join(", ");

  const handleDeleteWorkout = async () => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteWorkout(id);
            router.navigate("/(tabs)/workouts/splits");
          },
          style: "destructive",
        },
      ]
    );
    if (isPending) {
      return;
    }
    if (error) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.navigate("/(tabs)/workouts/splits")}
          >
            <Ionicons name="chevron-back" size={20} color="black" />
          </TouchableOpacity>
          <CustomText style={styles.title}>{workout?.name}</CustomText>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={handleDeleteWorkout}>
          <Feather name="trash-2" size={24} color="#EA2929" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.descriptionContainer}>
          <CustomText style={styles.smallTitle}>Description:</CustomText>
          <CustomText style={styles.description}>
            {workout?.description}
          </CustomText>
          <CustomText style={styles.smallTitle}>Workout Days:</CustomText>
          <CustomText style={styles.description}>
            {capitalizedWrokoutDays}
          </CustomText>
        </View>
        <View style={styles.schedulesContainer}>
          <CustomText style={styles.title}>Schedules</CustomText>
          {workout?.schedules?.map((schedule) => (
            <ScheduleCard key={schedule._id} scheduleDetails={schedule} />
          ))}
          <Button
            onPress={() =>
              router.navigate(`/(tabs)/workouts/createSchedule/${workout?._id}`)
            }
          >
            Create Schedule
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F9F6F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#707070",
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: 10,
  },
  smallTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#707070",
    marginBottom: 10,
  },
  schedulesContainer: {
    marginTop: 10,
    flexDirection: "column",
    gap: 10,
    marginBottom: 70,
  },
});

export default WorkoutDetails;
