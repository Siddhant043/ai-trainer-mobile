import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import React from "react";
import { SplashScreen } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    OutfitRegular: require("../../assets/fonts/Outfit-Regular.ttf"),
    OutfitSemiBold: require("../../assets/fonts/Outfit-SemiBold.ttf"),
  });

  if (!loaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          padding: 20,
          backgroundColor: "#F9F6F6",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="verify-otp" options={{ title: "Verify OTP" }} />
      <Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />
    </Stack>
  );
}
