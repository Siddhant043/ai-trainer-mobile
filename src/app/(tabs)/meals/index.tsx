import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { useRouter } from "expo-router";
import CurrentMacrosCard from "@/src/components/CurrentMacrosCard";
import Button from "@/src/components/Button";
import TodayMeals from "@/src/components/TodayMeals";
import AddMealModal from "@/src/components/modals/AddMealModal";

const Meals = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckHistory = () => {
    router.navigate("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CustomText style={styles.title}>Today's Macros</CustomText>
          <Pressable onPress={handleCheckHistory}>
            <CustomText style={styles.link}>Check History</CustomText>
          </Pressable>
        </View>
        <CurrentMacrosCard />
        <Button onPress={() => setIsOpen(true)}>Add Meal</Button>
        <AddMealModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
