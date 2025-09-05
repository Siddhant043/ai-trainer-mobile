import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Button from "../Button";
import CustomText from "../CustomText";
import { useRouter } from "expo-router";

const AddMealModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [mealDetails, setMealDetails] = useState<string>("");
  const router = useRouter();

  const handleAddImage = () => {
    // TODO: Implement image picker functionality
    console.log("Add image pressed");
  };

  const handleMicrophonePress = () => {
    // TODO: Implement voice recording functionality
    console.log("Microphone pressed");
  };

  const handleAddMeal = () => {
    if (!mealDetails) {
      setIsOpen(false);
      return;
    }
    // TODO: Implement add meal functionality
    console.log("Add meal pressed with details:", mealDetails);
    setIsOpen(false);
    router.navigate("/(tabs)/chats");
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <CustomText style={styles.title}>Add Meal</CustomText>
            <TouchableOpacity activeOpacity={0.8} onPress={handleAddImage}>
              <FontAwesome6 name="image" size={20} color="#707070" />
            </TouchableOpacity>
          </View>

          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your meal..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              value={mealDetails}
              onChangeText={setMealDetails}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.microphoneContainer}>
            <TouchableOpacity
              style={styles.microphoneButton}
              activeOpacity={0.8}
              onPress={handleMicrophonePress}
            >
              <Ionicons name="mic" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Button onPress={handleAddMeal}>Add Meal</Button>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "OutfitRegular",
    color: "#333",
  },
  addImageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FAFAFA",
    minHeight: 100,
    maxHeight: 150,
  },
  microphoneContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  microphoneButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddMealModal;
