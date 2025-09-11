import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/src/components/Button";
import SplitCard from "@/src/components/SplitCard";
import { useGetWorkouts } from "@/src/hooks/useWorkout";
import { Workout } from "@/src/types";
import CreateWorkoutSplitModal from "@/src/components/CreateWorkoutSplitModal";

const Splits = () => {
  const router = useRouter();
  const { workouts } = useGetWorkouts();
  const [isCreateWorkoutSplitModalOpen, setIsCreateWorkoutSplitModalOpen] =
    useState(false);
  const recommendedSplits = workouts?.filter((split) => !split.isCustom) || [];
  const customSplits = workouts?.filter((split) => split.isCustom) || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/(tabs)/workouts")}
        >
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
        <CustomText style={styles.title}>Workout Splits</CustomText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => setIsCreateWorkoutSplitModalOpen(true)}>
            Create New Split
          </Button>
        </View>

        <View style={styles.recommendedSplitsContainer}>
          <CustomText style={styles.recommendedSplitsTitle}>
            Recommneded Splits
          </CustomText>
          {recommendedSplits.length > 0 ? (
            recommendedSplits.map((split, index) => (
              <SplitCard
                key={split._id}
                isCardOpen={false}
                splitDetails={split}
              />
            ))
          ) : (
            <CustomText>No recommended splits found</CustomText>
          )}
        </View>

        <View style={styles.customSplitsContainer}>
          <CustomText style={styles.customSplitsTitle}>
            Custom Splits
          </CustomText>
          {customSplits.length > 0 ? (
            customSplits.map((split: Workout) => (
              <SplitCard
                key={split._id}
                isCardOpen={false}
                splitDetails={split}
              />
            ))
          ) : (
            <CustomText>No custom splits found</CustomText>
          )}
        </View>
      </ScrollView>

      <CreateWorkoutSplitModal
        isOpen={isCreateWorkoutSplitModalOpen}
        onClose={() => setIsCreateWorkoutSplitModalOpen(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f6f6",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "#707070",
  },
  buttonContainer: {
    marginTop: 30,
  },
  recommendedSplitsContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
  recommendedSplitsTitle: {
    fontSize: 20,
    color: "#707070",
  },
  customSplitsContainer: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
    marginBottom: 70,
  },
  customSplitsTitle: {
    fontSize: 20,
    color: "#707070",
  },
});

export default Splits;
