import CustomText from "@/src/components/CustomText";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SplitCard from "@/src/components/SplitCard";
import SecondaryButton from "@/src/components/SecondaryButton";

const Workouts = () => {
  const router = useRouter();

  const handleCheckHistory = () => {
    router.navigate("/(tabs)/home");
  };
  const scheduleDetails = {
    name: "Back and Biceps",
    exercises: [
      "Pull Ups",
      "Lat Pull Down",
      "Close Grip Lat Pull Down",
      "Seated Cable Rows",
      "Dumbbell Rows",
      "T Bar Rows",
      "Inclined Dumbbell Curls",
      "Hammer Curls",
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CustomText style={styles.title}>Your Workouts</CustomText>
          <Pressable onPress={handleCheckHistory}>
            <CustomText style={styles.link}>Check History</CustomText>
          </Pressable>
        </View>
        <View style={styles.activeSplitContainer}>
          <View style={styles.activeSplitTextValueContainer}>
            <CustomText style={styles.activeSplitTextValueTitle}>
              Active Split:
            </CustomText>
            <CustomText style={styles.activeSplitTextValueName}>
              2-muscle/day
            </CustomText>
          </View>
          <SplitCard scheduleDetails={scheduleDetails} />
          <SecondaryButton onPress={() => {}}>
            Change Workout Splits
          </SecondaryButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "regular",
    color: "#707070",
  },
  link: {
    fontSize: 12,
    fontWeight: "regular",
  },
  activeSplitContainer: {
    marginTop: 40,
    flexDirection: "column",
    gap: 10,
  },
  activeSplitTextValueContainer: {
    flexDirection: "row",
    gap: 5,
  },
  activeSplitTextValueTitle: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#707070",
  },
  activeSplitTextValueName: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "black",
  },
  schedulesContainer: {
    marginTop: 20,
  },
  schedulesTitle: {
    fontSize: 20,
    fontFamily: "OutfitRegular",
    color: "#707070",
  },
});

export default Workouts;
