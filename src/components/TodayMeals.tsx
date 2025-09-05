import { View, StyleSheet } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { FlashList } from "@shopify/flash-list";
import MealItem from "./MealItem";

const TodayMeals = () => {
  const mealData = [
    {
      id: 1,
      name: "Chhole Chawal",
      calories: 320,
      agentMessage:
        "This meal was carb heavy, please consume a balanced meal next time",
      protein: 10,
      carbs: 100,
      fat: 30,
    },
    {
      id: 2,
      name: "Roasted Chicken",
      calories: 200,
      agentMessage:
        "Protein quantity is good but please consume a balanced meal next time",
      protein: 40,
      carbs: 80,
      fat: 20,
    },
  ];
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Meals Consumed Today</CustomText>
      <FlashList
        data={mealData}
        renderItem={({ item }) => <MealItem meal={item} />}
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
