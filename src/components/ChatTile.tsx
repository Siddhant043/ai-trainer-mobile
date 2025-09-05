import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useRouter, RelativePathString } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ChatTile = ({ id, title }: { id: string; title: string }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        router.navigate(`/chat/${id}` as RelativePathString);
      }}
    >
      <Ionicons
        name="chatbubbles"
        size={20}
        color="#6692F2"
        style={styles.icon}
      />
      <CustomText style={styles.title}>{title}</CustomText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#C7C7C7",
  },
  title: {
    fontSize: 16,
    color: "#707070",
  },
  icon: {
    marginTop: 2,
  },
});

export default ChatTile;
