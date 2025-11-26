import { StyleSheet, View, Image } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import CalorieBurnIcon from "./CalorieBurnIcon";
import { useDailyNutrition } from "../hooks/useUser";

const TrackCaloriesHome = () => {
  const { dailyNutrition } = useDailyNutrition();
  const totalRequiredCalories = dailyNutrition?.totalRequiredCalories;
  const totalConsumedCalories = dailyNutrition?.totalConsumedCalories;
  const macrosMap = [
    {
      label: "Protein left",
      remainging:
        (
          dailyNutrition?.totalRequiredProtein -
          dailyNutrition?.totalConsumedProtein
        )
          .toFixed(0)
          .toString() + "g",
      icon: require("@/assets/macros/protein.png"),
      backgroundColor: "#F1D4BA",
    },
    {
      label: "Carbs left",
      remainging:
        (
          dailyNutrition?.totalRequiredCarbohydrates -
          dailyNutrition?.totalConsumedCarbohydrates
        )
          .toFixed(0)
          .toString() + "g",
      icon: require("@/assets/macros/carbs.png"),
      backgroundColor: "#D8EBED",
    },
    {
      label: "Fats left",
      remainging:
        (dailyNutrition?.totalRequiredFat - dailyNutrition?.totalConsumedFat)
          .toFixed(0)
          .toString() + "g",
      icon: require("@/assets/macros/fat.png"),
      backgroundColor: "#B8E5BE",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topSectionLeft}>
          <View style={styles.topSectionLeftIconContainer}>
            <CalorieBurnIcon
              progress={
                (totalConsumedCalories ?? 0) / (totalRequiredCalories ?? 0)
              }
            />
            <View style={styles.calorieBurnTextContainer}>
              <View style={styles.calorieBurnTextValueContainer}>
                <CustomText style={styles.calorieBurnTextValueNominator}>
                  {totalConsumedCalories}
                </CustomText>
                <CustomText style={styles.calorieBurnTextValueDenominator}>
                  /{totalRequiredCalories} Kcal
                </CustomText>
              </View>
              <CustomText style={styles.calorieBurnText}>
                calories ate today
              </CustomText>
            </View>
          </View>
        </View>
        <View style={styles.topSectionRight}>
          <CustomText style={styles.topSectionRightTextTitle}>
            Energy Level
          </CustomText>
          <CustomText style={styles.topSectionRightTextValue}>
            80/100
          </CustomText>
        </View>
      </View>
      <View style={styles.bottomSection}>
        {macrosMap.map((macro) => (
          <View key={macro.label} style={styles.macroItem}>
            <CustomText style={styles.remainginValue}>
              {macro.remainging}
            </CustomText>
            <CustomText style={styles.macroLabel}>{macro.label}</CustomText>
            <View
              style={[
                styles.macroIconContainer,
                { backgroundColor: macro.backgroundColor },
              ]}
            >
              <Image
                source={macro.icon}
                style={styles.macroIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    flexDirection: "column",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topSectionLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  calorieBurnTextContainer: {
    marginLeft: 10,
  },
  calorieBurnTextValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  calorieBurnText: {
    fontSize: 12,
    color: "#707070",
  },
  topSectionLeftIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  calorieBurnTextValueContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: 5,
  },
  calorieBurnTextValueNominator: {
    fontSize: 28,
    fontFamily: "Outfit-Bold",
    color: "black",
  },
  calorieBurnTextValueDenominator: {
    fontSize: 12,
    color: "#707070",
    marginBottom: 5,
  },
  topSectionRight: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: 5,
  },
  topSectionRightTextTitle: {
    fontSize: 12,
    color: "#707070",
  },
  topSectionRightTextValue: {
    fontSize: 16,
    color: "black",
    fontFamily: "Outfit-SemiBold",
  },
  bottomSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  macroItem: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  remainginValue: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
  },
  macroLabel: {
    fontSize: 12,
    color: "#707070",
  },
  macroIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    marginTop: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 100,
  },
  macroIcon: {
    width: 28,
    height: 28,
  },
});

export default TrackCaloriesHome;
