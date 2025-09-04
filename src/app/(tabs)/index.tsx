import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUserStore } from "@/src/store";
import { RelativePathString, useRouter } from "expo-router";
import CircularProgress from "@/src/components/CircularProgress";
import TrackCaloriesHome from "@/src/components/TrackCaloriesHome";
import AgentMessage from "@/src/components/AgentMessage";
import EmptyWorkoutPlan from "@/src/components/EmptyWorkoutPlan";

const Home = () => {
  const { user } = useUserStore();
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.headerLeftIconContainer}
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <FontAwesome5 name="user" size={16} color="black" />
            </TouchableOpacity>
            <View style={styles.headerLeftTextContainer}>
              <CustomText style={styles.welcomeText}>Welcome back,</CustomText>
              <CustomText style={styles.nameText}>{user.name}</CustomText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.headerRight}
            activeOpacity={0.8}
            onPress={() => {
              router.push("/notifications" as RelativePathString);
            }}
          >
            <FontAwesome5 name="bell" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.circularProgressSection}>
          <View style={styles.circularProgressContainer}>
            <CircularProgress progress={0.7} />
            <CustomText style={styles.dayText}>Mon</CustomText>
          </View>
          <View style={styles.circularProgressContainer}>
            <CircularProgress progress={0.6} />
            <CustomText style={styles.dayText}>Tue</CustomText>
          </View>
          <View style={styles.circularProgressContainer}>
            <CircularProgress progress={0.45} />
            <CustomText style={styles.dayText}>Wed</CustomText>
          </View>
          <View style={styles.circularProgressContainer}>
            <CircularProgress progress={0.8} />
            <CustomText style={styles.dayText}>Thu</CustomText>
          </View>
          <View style={styles.circularProgressContainer}>
            <CircularProgress progress={0.56} />
            <CustomText style={styles.dayText}>Fri</CustomText>
          </View>
          <View style={styles.circularProgressContainer}>
            <CircularProgress progress={0.67} active={true} />
            <CustomText style={styles.dayText}>Sat</CustomText>
          </View>
        </View>
        <TrackCaloriesHome />
        <AgentMessage
          type="suggestion"
          value="Add 10 mins inclined walking and 5 mins cycling after workout."
        />
        <EmptyWorkoutPlan />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerLeftIconContainer: {
    backgroundColor: "#D4D4D4",
    borderRadius: 100,
    padding: 12,
  },
  headerLeftTextContainer: {
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#707070",
  },
  nameText: {
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
    color: "black",
  },
  headerRight: {},
  circularProgressSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  circularProgressContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 12,
    marginTop: 5,
    color: "#707070",
  },
});

export default Home;
