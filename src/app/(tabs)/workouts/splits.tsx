import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Button from "@/src/components/Button";
import SplitCard from "@/src/components/SplitCard";

const Splits = () => {
  const router = useRouter();
  const recommendedSplits = [
    {
      id: 1,
      name: "2-muscle/day",
      schedules: ["Chest and Triceps", "Back and Biceps", "Legs and Shoulders"],
      isActive: true,
    },
    {
      id: 2,
      name: "Split 2",
      schedules: ["Schedule 1", "Schedule 2", "Schedule 3", "Schedule 4"],
      isActive: false,
    },
  ];

  const customSplits = [
    {
      id: 3,
      name: "Split 3",
      schedules: ["Schedule 1", "Schedule 2", "Schedule 3", "Schedule 4"],
      isActive: false,
    },
    {
      id: 4,
      name: "Split 4",
      schedules: ["Schedule 1", "Schedule 2", "Schedule 3", "Schedule 4"],
      isActive: false,
    },
  ];
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

      <View style={styles.recommendedSplitsContainer}>
        <CustomText style={styles.recommendedSplitsTitle}>
          Recommneded Splits
        </CustomText>
        {recommendedSplits.map((split, index) => (
          <SplitCard
            key={split.id}
            isCardOpen={index === 0 ? true : false}
            splitDetails={split}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.push("/workouts/createSplit")}>
          Create New Split
        </Button>
      </View>
      <View style={styles.customSplitsContainer}>
        <CustomText style={styles.customSplitsTitle}>Custom Splits</CustomText>
        {customSplits.map((split) => (
          <SplitCard key={split.id} isCardOpen={false} splitDetails={split} />
        ))}
      </View>
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
    marginBottom: 20,
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
  },
  customSplitsTitle: {
    fontSize: 20,
    color: "#707070",
  },
});

export default Splits;
