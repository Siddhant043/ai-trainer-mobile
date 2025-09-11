import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Exercise } from "../types";
import CustomText from "./CustomText";
import Button from "./Button";
import ExerciseDetailsModal from "./ExerciseDetailsModal";

const ExerciseCard = ({
  exercise,
  isSelectable,
  setSelectedExercises,
  selectedExercises,
}: {
  exercise: Exercise;
  isSelectable: boolean;
  setSelectedExercises: (exercises: Exercise[]) => void;
  selectedExercises: Exercise[];
}) => {
  const [visible, setVisible] = useState(false);
  const onRequestClose = () => setVisible(false);

  if (!isSelectable) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.defaultContainer}
          onPress={() => setVisible(true)}
        >
          {exercise.imageUrl.length > 0 && (
            <Image
              source={{ uri: exercise.imageUrl[0] }}
              style={styles.image}
            />
          )}
          <CustomText style={styles.text}>{exercise.exerciseName}</CustomText>
        </TouchableOpacity>
        <ExerciseDetailsModal
          exercise={exercise}
          visible={visible}
          onRequestClose={onRequestClose}
        />
      </>
    );
  }

  // ✅ derive selection directly from props
  const isSelected = selectedExercises
    .map((exercise) => exercise._id)
    .includes(String(exercise._id));

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => setVisible(true)}
      >
        <Image source={{ uri: exercise.imageUrl[0] }} style={styles.image} />
        <CustomText style={styles.text}>{exercise.exerciseName}</CustomText>

        {isSelected ? (
          <TouchableOpacity
            onPress={() =>
              setSelectedExercises(
                selectedExercises.filter(
                  (exercise) => exercise._id !== exercise._id
                )
              )
            }
          >
            <CustomText>Remove</CustomText>
          </TouchableOpacity>
        ) : (
          <Button
            size="small"
            onPress={() =>
              setSelectedExercises([...selectedExercises, exercise])
            }
          >
            Add
          </Button>
        )}
      </TouchableOpacity>

      <ExerciseDetailsModal
        exercise={exercise}
        visible={visible}
        onRequestClose={onRequestClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 220,
    width: 180,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: "#CACACA",
  },
  container: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 240,
    width: 180,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: "#CACACA",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    textTransform: "capitalize",
  },
});

export default ExerciseCard;
