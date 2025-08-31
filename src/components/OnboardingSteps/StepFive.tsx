import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomText from "../CustomText";
import Button from "../Button";
import { GYM_EQUIPMENTS } from "@/src/constants";
import SingleSelectOptionCard from "../SingleSelectOptionCard";
import { FlashList } from "@shopify/flash-list";

const StepFive = ({ setNext }: { setNext: (step: number) => void }) => {
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  const checkIsSelected = (value: string) => {
    return selectedEquipments.includes(value);
  };

  const handleSelectItem = (value: string) => {
    if (selectedEquipments.includes(value)) {
      setSelectedEquipments(
        selectedEquipments.filter((item) => item !== value)
      );
    } else {
      setSelectedEquipments([...selectedEquipments, value]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title}>Select Equipments</CustomText>
      </View>
      <View style={styles.formContainer}>
        <FlashList
          style={styles.flashList}
          numColumns={2}
          data={GYM_EQUIPMENTS}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />} // vertical gap // horizontal gap when numColumns > 1
          renderItem={({ item, index }) => (
            <SingleSelectOptionCard
              equipment={item}
              index={index}
              isSelected={checkIsSelected(item.value)}
              handleSelectItem={handleSelectItem}
            />
          )}
        />
        <Button onPress={() => setNext(6)}>Next</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 5,
  },
  title: {
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
  },
  flashList: {
    marginVertical: 20,
  },
});

export default StepFive;
