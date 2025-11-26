import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, useRouter } from "expo-router";

const mealHistory = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/(tabs)/meals" as RelativePathString)}
        >
          <Ionicons name="chevron-back" size={20} color="#707070" />
        </TouchableOpacity>
        <CustomText style={styles.title}>Meal History</CustomText>
      </View>
      <View style={styles.actionsContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "OutfitRegular",
    color: "#707070",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});

export default mealHistory;
