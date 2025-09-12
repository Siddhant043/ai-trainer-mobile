import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { Exercise } from "../types";
import CustomText from "./CustomText";
import Button from "./Button";
import ExerciseDetailsModal from "./ExerciseDetailsModal";

const ExerciseCard = React.memo(
  ({
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
    const onRequestClose = useCallback(() => setVisible(false), []);

    const handleOpenModal = useCallback(() => setVisible(true), []);
    const handleRemoveExercise = useCallback(() => {
      setSelectedExercises(
        selectedExercises.filter(
          (selectedExercise) => selectedExercise._id !== exercise._id
        )
      );
    }, [selectedExercises, exercise._id, setSelectedExercises]);

    const handleAddExercise = useCallback(() => {
      setSelectedExercises([...selectedExercises, exercise]);
    }, [selectedExercises, exercise, setSelectedExercises]);

    if (!isSelectable) {
      return (
        <>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.defaultContainer}
            onPress={handleOpenModal}
          >
            {exercise.imageUrl && exercise.imageUrl.length > 0 && (
              <Image
                source={{
                  uri:
                    exercise.imageUrl[0] ||
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fno-image-icon&psig=AOvVaw3EKFb3YYAXeljYwSfSUUxR&ust=1757702763246000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCODKoJ2v0Y8DFQAAAAAdAAAAABAE",
                }}
                style={styles.image}
              />
            )}
            <CustomText style={styles.text}>{exercise.exerciseName}</CustomText>
          </TouchableOpacity>
          <ExerciseDetailsModal
            key={exercise._id + "exercise-details-modal"}
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
          onPress={handleOpenModal}
        >
          <Image source={{ uri: exercise.imageUrl[0] }} style={styles.image} />
          <CustomText style={styles.text}>{exercise.exerciseName}</CustomText>

          {isSelected ? (
            <TouchableOpacity onPress={handleRemoveExercise}>
              <CustomText>Remove</CustomText>
            </TouchableOpacity>
          ) : (
            <Button size="small" onPress={handleAddExercise}>
              Add
            </Button>
          )}
        </TouchableOpacity>

        <ExerciseDetailsModal
          key={exercise._id + "exercise-details-modal"}
          exercise={exercise}
          visible={visible}
          onRequestClose={onRequestClose}
        />
      </>
    );
  }
);

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
