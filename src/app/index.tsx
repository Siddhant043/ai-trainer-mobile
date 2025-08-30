import { RelativePathString, useRouter } from "expo-router";
import { View } from "react-native";
import { useUserStore } from "../store";
import { useEffect } from "react";
import CustomText from "../components/CustomText";

export default function Index() {
  const router = useRouter();
  const { getIsAuthenticated } = useUserStore();
  useEffect(() => {
    if (!getIsAuthenticated()) {
      router.navigate("/onboarding" as RelativePathString);
    }
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText>Loading...</CustomText>
    </View>
  );
}
