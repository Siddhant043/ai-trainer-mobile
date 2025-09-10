import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { Exercise } from "../types";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

const ExerciseDetailsModal = ({
  exercise,
  visible,
  onRequestClose,
}: {
  exercise: Exercise;
  visible: boolean;
  onRequestClose: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.bottomSheet}>
        {/* Handle bar */}
        <View style={styles.handleBar} />

        {/* Header */}
        <View style={styles.header}>
          <CustomText style={styles.title}>{exercise.exerciseName}</CustomText>
          <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Image */}
          <View style={styles.section}>
            <Image
              source={{ uri: exercise.imageUrl[0] }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <CustomText style={styles.sectionContent}>
              {exercise.description}
            </CustomText>
          </View>
          <View style={styles.middleSection}>
            {/* Equipment */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>Equipment</CustomText>
              <CustomText style={styles.sectionContent}>
                {exercise.equipment}
              </CustomText>
            </View>

            {/* Body Parts */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>Body Parts</CustomText>
              <CustomText style={styles.sectionContent}>
                {exercise.bodyPart}
              </CustomText>
            </View>

            {/* Target Muscles */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                Target Muscles
              </CustomText>
              <CustomText style={styles.sectionContent}>
                {exercise.target}
              </CustomText>
            </View>
          </View>

          {/* Secondary Muscles */}
          {exercise.secondaryMuscels &&
            exercise.secondaryMuscels.length > 0 && (
              <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>
                  Secondary Muscles
                </CustomText>
                <View style={styles.tagsContainer}>
                  {exercise.secondaryMuscels.map((muscle, index) => (
                    <View key={index} style={styles.tag}>
                      <CustomText style={styles.tagText}>{muscle}</CustomText>
                    </View>
                  ))}
                </View>
              </View>
            )}

          {/* Instructions */}
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>Instructions</CustomText>
            {exercise.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <CustomText style={styles.instructionNumberText}>
                    {index + 1}
                  </CustomText>
                </View>
                <CustomText style={styles.instructionText}>
                  {instruction}
                </CustomText>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.85,
    minHeight: screenHeight * 0.4,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontFamily: "OutfitSemiBold",
    color: "#1C1C1E",
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "OutfitSemiBold",
    color: "#1C1C1E",
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: "OutfitRegular",
    color: "#666",
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "OutfitMedium",
    color: "#666",
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  instructionNumber: {
    width: 24,
    height: 24,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: 12,
    fontFamily: "OutfitSemiBold",
    color: "#fff",
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "OutfitRegular",
    color: "#333",
    lineHeight: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  middleSection: {
    flexDirection: "row",
    gap: 24,
  },
});

export default ExerciseDetailsModal;
