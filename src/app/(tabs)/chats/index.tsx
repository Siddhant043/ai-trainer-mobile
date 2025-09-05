import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/src/components/CustomText";
import { RelativePathString, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import ChatTile from "@/src/components/ChatTile";
import { Ionicons } from "@expo/vector-icons";

const Chats = () => {
  const router = useRouter();
  const handleAddChat = () => {
    router.navigate("/chat/new" as RelativePathString);
  };

  const recentChats = [
    {
      id: "1",
      title: "Food comparison for high protein and low calories",
    },
    {
      id: "2",
      title: "Workout plan for weight loss",
    },
    {
      id: "3",
      title: "Back workout modification",
    },
  ];

  const historyChats = [
    {
      id: "4",
      title: "Update Chest workout",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CustomText style={styles.title}>Your Chats</CustomText>
          <TouchableOpacity onPress={handleAddChat} activeOpacity={0.8}>
            <Ionicons name="add-circle" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.recentChatsContainer}>
          <CustomText style={styles.recentChatsTitle}>Recent</CustomText>
        </View>
        <FlashList
          data={recentChats}
          estimatedItemSize={100}
          renderItem={({ item }) => (
            <ChatTile key={item.id} id={item.id} title={item.title} />
          )}
        />

        <View style={styles.recentChatsContainer}>
          <CustomText style={styles.recentChatsTitle}>History</CustomText>
        </View>
        <FlashList
          data={historyChats}
          estimatedItemSize={100}
          renderItem={({ item }) => (
            <ChatTile key={item.id} id={item.id} title={item.title} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "regular",
    color: "#707070",
  },
  link: {
    fontSize: 12,
    fontWeight: "regular",
  },
  recentChatsContainer: {
    flex: 1,
    marginTop: 20,
  },
  recentChatsTitle: {
    fontSize: 16,
    fontWeight: "regular",
  },
});

export default Chats;
