import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";

const Home = () => {
  return (
    <SafeAreaView>
      <CustomText>Home</CustomText>
    </SafeAreaView>
  );
};

export default Home;
