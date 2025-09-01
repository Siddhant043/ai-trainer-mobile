import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import React from "react";
import { SplashScreen } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state: any) => {
    setOnline(!!state.isConnected);
  });
});

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
    OutfitRegular: require("../../assets/fonts/Outfit-Regular.ttf"),
    OutfitSemiBold: require("../../assets/fonts/Outfit-SemiBold.ttf"),
    OutfitBold: require("../../assets/fonts/Outfit-Bold.ttf"),
  });

  if (!loaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
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
        <Stack.Screen name="home" options={{ title: "Home" }} />
      </Stack>
    </QueryClientProvider>
  );
}
