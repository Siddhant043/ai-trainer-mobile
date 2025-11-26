import { View, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { FlashList } from "@shopify/flash-list";
import MealItem from "./MealItem";
import { Meal } from "../types";
import useMealsStore from "../store/mealsStore";

const TodayMeals = () => {
  const { todaysMeals } = useMealsStore();
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Meals Consumed Today</CustomText>
      <FlashList
        data={todaysMeals}
        estimatedItemSize={100}
        renderItem={({ item }) => <MealItem meal={item as Meal} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 80,
  },
  title: {
    fontSize: 20,
    color: "#707070",
    marginBottom: 10,
  },
});

export default TodayMeals;
