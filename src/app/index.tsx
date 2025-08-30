import { RelativePathString, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useUserStore } from "../store";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const { getIsAuthenticated } = useUserStore();
  useEffect(() => {
    if (!getIsAuthenticated()) {
      router.navigate("/verify-otp" as RelativePathString);
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
      <Text>Loading...</Text>
    </View>
  );
}
