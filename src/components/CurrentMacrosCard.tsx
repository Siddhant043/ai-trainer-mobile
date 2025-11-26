import { StyleSheet, View, Image } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import CalorieBurnIcon from "./CalorieBurnIcon";
import ProgressLine from "./ProgressLine";
import { useDailyNutrition } from "../hooks/useUser";

const CurrentMacrosCard = () => {
  // This hook will automatically refetch every 10 seconds if dailyNutrition is missing
  const { dailyNutrition, isDailyNutritionMissing, isLoading } =
    useDailyNutrition();
  console.log("dailyNutrition", dailyNutrition);

  const totalRequiredCalories = dailyNutrition?.totalRequiredCalories;
  const totalConsumedCalories = dailyNutrition?.totalConsumedCalories;
  const totalRequiredProtein = dailyNutrition?.totalRequiredProtein;
  const totalConsumedProtein = dailyNutrition?.totalConsumedProtein;
  const totalRequiredCarbohydrates = dailyNutrition?.totalRequiredCarbohydrates;
  const totalConsumedCarbohydrates = dailyNutrition?.totalConsumedCarbohydrates;
  const totalRequiredFat = dailyNutrition?.totalRequiredFat;
  const totalConsumedFat = dailyNutrition?.totalConsumedFat;
  const macrosMap = [
    {
      label: "Protein",
      nominator: totalConsumedProtein,
      denominator: totalRequiredProtein,
      icon: require("@/assets/macros/protein.png"),
      backgroundColor: "#F1D4BA",
    },
    {
      label: "Carbs",
      nominator: totalConsumedCarbohydrates,
      denominator: totalRequiredCarbohydrates,
      icon: require("@/assets/macros/carbs.png"),
      backgroundColor: "#D8EBED",
    },
    {
      label: "Fats",
      nominator: totalConsumedFat,
      denominator: totalRequiredFat,
      icon: require("@/assets/macros/fat.png"),
      backgroundColor: "#B8E5BE",
    },
  ];

  const energyPercentage =
    ((totalConsumedCalories ?? 0) / (totalRequiredCalories ?? 0)) * 100;

  // Show loading state if data is being fetched for the first time
  if (isLoading && isDailyNutritionMissing) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <CustomText style={styles.loadingText}>
            Loading nutrition data...
          </CustomText>
        </View>
      </View>
    );
  }

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
                  /{totalRequiredCalories}
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
            {energyPercentage.toFixed(0)}/100
          </CustomText>
        </View>
      </View>
      <View style={styles.bottomSection}>
        {macrosMap.map((macro) => (
          <View key={macro.label} style={styles.macroItem}>
            <View style={styles.macroItemLeft}>
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
              <CustomText style={styles.macroLabel}>{macro.label}</CustomText>
            </View>
            <ProgressLine
              progress={(macro.nominator ?? 0) / (macro.denominator ?? 0)}
            />
            <View style={styles.macroTextContainer}>
              <View style={styles.calorieBurnTextValueContainer}>
                <CustomText style={styles.macroTextValueNominator}>
                  {macro.nominator}
                </CustomText>
                <CustomText style={styles.macroTextValueDenominator}>
                  /{macro.denominator}g
                </CustomText>
              </View>
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
  },
  macroItem: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  macroItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  macroLabel: {
    fontSize: 16,
    color: "#707070",
  },
  macroIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,

    backgroundColor: "#EDEDED",
    borderRadius: 100,
  },
  macroIcon: {
    width: 28,
    height: 28,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  loadingText: {
    fontSize: 14,
    color: "#707070",
    fontFamily: "OutfitRegular",
  },
  macroTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  macroTextValueNominator: {
    fontSize: 16,
    color: "black",
    fontFamily: "Outfit-SemiBold",
  },
  macroTextValueDenominator: {
    fontSize: 12,
    color: "#707070",
  },
});

export default CurrentMacrosCard;
