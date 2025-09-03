import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import CalorieBurnIcon from "./CalorieBurnIcon";
import CustomTextInput from "./CustomTextInput";

const TrackCaloriesHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topSectionLeft}>
          <View style={styles.topSectionLeftIconContainer}>
            <CalorieBurnIcon progress={0.7} />
            <View style={styles.calorieBurnTextContainer}>
              <View style={styles.calorieBurnTextValueContainer}>
                <CustomText style={styles.calorieBurnTextValueNominator}>
                  442
                </CustomText>
                <CustomText style={styles.calorieBurnTextValueDenominator}>
                  /2200
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
      <View style={styles.bottomSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    flexDirection: "column",
    padding: 20,
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
  bottomSection: {},
});

export default TrackCaloriesHome;
