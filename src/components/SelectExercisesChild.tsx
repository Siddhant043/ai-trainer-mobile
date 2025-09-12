import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import CustomText from "./CustomText";
import { Ionicons } from "@expo/vector-icons";
import { useGetExercises, useDebounce } from "../hooks";
import { FlashList } from "@shopify/flash-list";
import { Exercise, ExercisesResponse } from "../types";
import ExerciseCard from "./ExerciseCard";
import { useExerciseStore } from "../store";
import { BODY_PARTS, CATEGORY, EQUIPMENTS, TARGETS } from "../constants";
import CompactFilter from "./CompactFilter";

const SelectExercisesChild = ({
  selectedExercises = [],
  setSelectedExercises = () => {},
  isSelectable = false,
}: {
  selectedExercises?: Exercise[];
  setSelectedExercises?: (exercises: Exercise[]) => void;
  isSelectable?: boolean;
}) => {
  // Local state for search input and filters
  const [searchInput, setSearchInput] = useState("");
  const [bodyPartValue, setBodyPartValue] = useState("");
  const [equipmentValue, setEquipmentValue] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // Debounced search query (500ms delay)
  const debouncedSearchQuery = useDebounce(searchInput, 500);
  // Debounced filter values (300ms delay for faster response)
  const debouncedBodyPart = useDebounce(bodyPartValue, 300);
  const debouncedEquipment = useDebounce(equipmentValue, 300);
  const debouncedTarget = useDebounce(targetValue, 300);
  const debouncedCategory = useDebounce(categoryValue, 300);

  // Exercise store state and actions
  const {
    exercises,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    searchQuery,
    bodyPart,
    target,
    equipment,
    category,
    setExercises,
    appendExercises,
    setCurrentPage,
    setTotalPages,
    setHasMore,
    setIsLoading,
    setSearchQuery,
    setBodyPart,
    setEquipment,
    resetExercises,
    resetPagination,
    setTarget,
    setCategory,
  } = useExerciseStore();

  const limit = 20;

  // Update search query in store when debounced value changes
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setSearchQuery(debouncedSearchQuery);
      resetPagination();
      resetExercises();
    }
  }, [
    debouncedSearchQuery,
    searchQuery,
    setSearchQuery,
    resetPagination,
    resetExercises,
  ]);

  // Update body part in store when debounced value changes
  useEffect(() => {
    if (debouncedBodyPart !== bodyPart) {
      setBodyPart(debouncedBodyPart);
      resetPagination();
      resetExercises();
    }
  }, [
    debouncedBodyPart,
    bodyPart,
    setBodyPart,
    resetPagination,
    resetExercises,
  ]);

  // Update equipment in store when debounced value changes
  useEffect(() => {
    if (debouncedEquipment !== equipment) {
      setEquipment(debouncedEquipment);
      resetPagination();
      resetExercises();
    }
  }, [
    debouncedEquipment,
    equipment,
    setEquipment,
    resetPagination,
    resetExercises,
  ]);

  // Update target in store when debounced value changes
  useEffect(() => {
    if (debouncedTarget !== target) {
      setTarget(debouncedTarget);
      resetPagination();
      resetExercises();
    }
  }, [debouncedTarget, target, setTarget, resetPagination, resetExercises]);

  // Update category in store when debounced value changes
  useEffect(() => {
    if (debouncedCategory !== category) {
      setCategory(debouncedCategory);
      resetPagination();
      resetExercises();
    }
  }, [
    debouncedCategory,
    category,
    setCategory,
    resetPagination,
    resetExercises,
  ]);

  // Fetch exercises with current parameters
  const {
    data,
    isLoading: queryLoading,
    error,
    isFetching,
    refetch,
    invalidateQueries,
  } = useGetExercises(
    searchQuery,
    bodyPart,
    target,
    currentPage,
    limit,
    equipment,
    category
  );

  // Update store when data changes
  useEffect(() => {
    if (
      data &&
      typeof data === "object" &&
      "exercises" in data &&
      "pages" in data
    ) {
      const { exercises: newExercises, pages: newTotalPages } =
        data as ExercisesResponse;

      setTotalPages(newTotalPages);
      setHasMore(currentPage < newTotalPages);
      setIsLoading(false);

      if (currentPage === 1) {
        setExercises(newExercises);
      } else {
        appendExercises(newExercises);
      }
    }
  }, [
    data,
    currentPage,
    setTotalPages,
    setHasMore,
    setIsLoading,
    setExercises,
    appendExercises,
  ]);

  // Ensure initial data is loaded when component mounts
  useEffect(() => {
    // If we have no exercises and we're on page 1, trigger initial load
    if (exercises.length === 0 && currentPage === 1 && !queryLoading && !data) {
      // Force initial data fetch
      refetch();
    }
  }, [exercises.length, currentPage, queryLoading, data, refetch]);

  // Handle search input change
  const handleSearchChange = useCallback((text: string) => {
    setSearchInput(text);
  }, []);

  // Handle load more exercises
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isFetching && !queryLoading) {
      setCurrentPage(currentPage + 1);
    }
  }, [hasMore, isFetching, queryLoading, currentPage, setCurrentPage]);

  // Handle pull to refresh
  const handleRefresh = useCallback(() => {
    // Reset search input first
    setSearchInput("");
    // Reset filter values
    setBodyPartValue("");
    setEquipmentValue("");
    setTargetValue("");
    setCategoryValue("");
    // Reset search query in store
    setSearchQuery("");
    // Reset pagination and exercises
    resetPagination();

    // Invalidate all exercise queries to force fresh fetch
    invalidateQueries();
  }, [resetPagination, setSearchQuery, invalidateQueries]);

  // Memoized render item for better performance
  const renderExerciseItem = useCallback(
    ({ item }: { item: Exercise }) => (
      <ExerciseCard
        exercise={item}
        isSelectable={isSelectable}
        setSelectedExercises={setSelectedExercises}
        selectedExercises={selectedExercises}
      />
    ),
    [isSelectable, setSelectedExercises, selectedExercises]
  );

  // Memoized footer component
  const ListFooterComponent = useMemo(() => {
    if (isFetching && currentPage > 1) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color="#007AFF" />
          <CustomText style={styles.loadingText}>
            Loading more exercises...
          </CustomText>
        </View>
      );
    }
    return null;
  }, [isFetching, currentPage]);

  // Memoized empty component
  const EmptyComponent = useMemo(() => {
    // Show loading state for initial load or when loading first page
    if (queryLoading && currentPage === 1) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <CustomText style={styles.emptyText}>Loading exercises...</CustomText>
        </View>
      );
    }

    // Show error state
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
          <CustomText style={styles.emptyText}>
            Error loading exercises
          </CustomText>
          <CustomText style={styles.errorSubtext}>Please try again</CustomText>
        </View>
      );
    }

    // Show empty state when no exercises and not loading
    if (exercises.length === 0 && !queryLoading) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color="#8E8E93" />
          <CustomText style={styles.emptyText}>
            {searchQuery ? "No exercises found" : "No exercises available"}
          </CustomText>
          <CustomText style={styles.emptySubtext}>
            {searchQuery
              ? "Try a different search term"
              : "Please check your connection and try again"}
          </CustomText>
        </View>
      );
    }

    return null;
  }, [queryLoading, currentPage, error, exercises.length, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for exercises..."
          placeholderTextColor="#707070"
          value={searchInput}
          onChangeText={handleSearchChange}
          returnKeyType="search"
        />
        <Ionicons
          name="search"
          size={24}
          color="#707070"
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.filtersContainer}>
        <CompactFilter
          options={EQUIPMENTS.map((equipment) => ({
            label: equipment,
            value: equipment,
          }))}
          selectedValue={equipmentValue}
          onValueChange={setEquipmentValue}
          placeholder="Equipment"
        />
        <CompactFilter
          options={BODY_PARTS.map((bodyPart) => ({
            label: bodyPart,
            value: bodyPart,
          }))}
          selectedValue={bodyPartValue}
          onValueChange={setBodyPartValue}
          placeholder="Body Part"
        />
      </View>
      <View style={styles.filtersContainer}>
        <CompactFilter
          options={TARGETS.map((target) => ({
            label: target,
            value: target,
          }))}
          selectedValue={targetValue}
          onValueChange={setTargetValue}
          placeholder="Target"
        />
        <CompactFilter
          options={CATEGORY.map((category) => ({
            label: category,
            value: category,
          }))}
          selectedValue={categoryValue}
          onValueChange={setCategoryValue}
          placeholder="Category"
        />
      </View>

      {/* Exercises List */}
      <View style={styles.exercisesContainer}>
        <FlashList
          data={exercises}
          estimatedItemSize={100}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderExerciseItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={EmptyComponent}
          extraData={selectedExercises}
          refreshControl={
            <RefreshControl
              refreshing={queryLoading && currentPage === 1}
              onRefresh={handleRefresh}
              tintColor="#007AFF"
            />
          }
          keyExtractor={(item, index) => `${item._id}-${index}`}
          removeClippedSubviews={false}
          drawDistance={250}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  searchBarContainer: {
    width: "100%",
    position: "relative",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50,
    marginTop: 5,
    color: "#000",
    fontSize: 16,
    fontFamily: "OutfitRegular",
  },
  searchIcon: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 4,
  },
  exercisesContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 40,
  },
  loadingFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    color: "#8E8E93",
    fontSize: 14,
    fontFamily: "OutfitRegular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "OutfitSemiBold",
    color: "#1C1C1E",
    textAlign: "center",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "OutfitRegular",
    color: "#8E8E93",
    textAlign: "center",
    marginTop: 8,
  },
  errorSubtext: {
    fontSize: 14,
    fontFamily: "OutfitRegular",
    color: "#FF3B30",
    textAlign: "center",
    marginTop: 8,
  },
});

export default SelectExercisesChild;
