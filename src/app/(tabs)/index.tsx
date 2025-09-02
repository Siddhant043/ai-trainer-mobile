import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { FontAwesome5 } from "@expo/vector-icons";
import { useUserStore } from "@/src/store";
import { router } from "expo-router";

const Home = () => {
  const { user } = useUserStore();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.headerLeftIconContainer}
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
              //router.push("/notifications");
            }}
          >
            <FontAwesome5 name="bell" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    width: "100%",
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
});

export default Home;
