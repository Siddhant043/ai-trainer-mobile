import { View, SafeAreaView, StyleSheet, Pressable } from "react-native";
import CustomText from "@/src/components/CustomText";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Chat = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const chatTitle = id === "new" ? "New Chat" : id;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="black" />
        </Pressable>
        <CustomText style={styles.title}>{chatTitle}</CustomText>
        <Pressable onPress={() => {}}>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
  },
});
export default Chat;
