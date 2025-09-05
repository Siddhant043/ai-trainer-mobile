import HapticTab from "@/src/components/HapticTab";
import ChatTabIcon from "@/src/components/icons/ChatTabIcon";
import ChartsTabIcon from "@/src/components/icons/ChartsTabIcon";
import FoodTabIcon from "@/src/components/icons/FoodTabIcon";
import HomeTabIcon from "@/src/components/icons/HomeTabIcon";
import WorkoutTabIcon from "@/src/components/icons/WorkoutTabIcon";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          height: "auto",
          paddingBottom: 30,
          paddingTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: "50%",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarButton: (props) => <HapticTab {...props} />,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <HomeTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="meals/index"
        options={{
          title: "Meals",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <FoodTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="workouts/index"
        options={{
          title: "Workouts",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <WorkoutTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="charts/index"
        options={{
          title: "Charts",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <ChartsTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chats/index"
        options={{
          title: "Chats",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => <ChatTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
