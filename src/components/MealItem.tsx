import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { MaterialIcons } from "@expo/vector-icons";

const MealItem = ({ meal }: { meal: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <CustomText style={styles.title}>{meal.name}: </CustomText>
          <CustomText style={styles.calories}>{meal.calories} Kcal</CustomText>
        </View>
        <View style={styles.headerRight}>
          <MaterialIcons name="delete" size={16} color="#A8A8A8" />
        </View>
      </View>
      <CustomText style={styles.agentMessage}>{meal.agentMessage}</CustomText>
      <View style={styles.macroContainer}>
        <MacroItem
          macroName="Protein"
          macroValue={meal.protein}
          backgroundColor="#F1D4BA"
          icon={require("@/assets/macros/protein.png")}
        />
        <MacroItem
          macroName="Carbs"
          macroValue={meal.carbs}
          backgroundColor="#D8EBED"
          icon={require("@/assets/macros/carbs.png")}
        />
        <MacroItem
          macroName="Fat"
          macroValue={meal.fat}
          backgroundColor="#B8E5BE"
          icon={require("@/assets/macros/fat.png")}
        />
      </View>
    </View>
  );
};

const MacroItem = ({
  macroName,
  macroValue,
  backgroundColor,
  icon,
}: {
  macroName: string;
  macroValue: number;
  backgroundColor: string;
  icon: ImageSourcePropType;
}) => {
  return (
    <View style={styles.macroItem}>
      <CustomText style={styles.macroValue}>{macroValue}g</CustomText>
      <View
        style={[
          styles.macroIconContainer,
          { backgroundColor: backgroundColor },
        ]}
      >
        <Image source={icon} style={styles.macroIcon} resizeMode="contain" />
      </View>
      <CustomText style={styles.macroLabel}>{macroName}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 30,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#707070",
  },
  calories: {
    fontSize: 16,
    fontFamily: "OutfitSemiBold",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  agentMessage: {
    fontSize: 16,
  },
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  macroItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  macroValue: {
    fontSize: 20,
    fontFamily: "OutfitBold",
    marginBottom: 10,
  },
  macroLabel: {
    fontSize: 12,
  },
  macroIconContainer: {
    backgroundColor: "#D4D4D4",
    borderRadius: 100,
    padding: 12,
  },
  macroIcon: {
    width: 24,
    height: 24,
  },
});

export default MealItem;
