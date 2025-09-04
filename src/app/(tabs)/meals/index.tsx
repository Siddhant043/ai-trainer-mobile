import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { Link } from "expo-router";
import CurrentMacrosCard from "@/src/components/CurrentMacrosCard";
import Button from "@/src/components/Button";
import TodayMeals from "@/src/components/TodayMeals";

const Meals = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CustomText style={styles.title}>Today's Macros</CustomText>
          <Link href="/(tabs)" style={styles.link}>
            Check History
          </Link>
        </View>
        <CurrentMacrosCard />
        <Button onPress={() => {}}>Add Meal</Button>
        <TodayMeals />
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
});

export default Meals;
