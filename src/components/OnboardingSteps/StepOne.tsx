import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../CustomTextInput";
import CustomDatePicker from "../CustomDatePicker";
import CustomText from "../CustomText";
import SingleSelectRadio from "../SingleSelectRadio";
import Button from "../Button";
import { useUserStore } from "@/src/store";
import { protectFromNaN } from "@/src/utils/safeMath";

const StepOne = ({ setNext }: { setNext: (step: number) => void }) => {
  const { getUser, setUser } = useUserStore();
  const user = getUser();
  const [fullName, setFullName] = useState(user?.name || "");
  const [date, setDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [gender, setGender] = useState(user?.physicalDetials?.gender || "Male");
  const [height, setHeight] = useState(
    user?.physicalDetials?.height?.toString() || ""
  );
  const [weight, setWeight] = useState(
    user?.physicalDetials?.weight?.toString() || ""
  );

  const handleNext = () => {
    if (!user._id || !user.email) {
      console.log("User not logged in");
      return;
    }

    setUser({
      ...user,
      name: fullName,
      phoneNumber: phoneNumber,
      physicalDetials: {
        ...user?.physicalDetials,
        gender: gender,
        height: protectFromNaN(height),
        weight: protectFromNaN(weight),
      },
    });
    setNext(2);
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Personal Details</CustomText>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <CustomTextInput
          label="Full Name"
          placeholder="Full Name"
          value={fullName}
          handleValueChange={setFullName}
        />
        <CustomDatePicker date={date} setDate={setDate} />
        <CustomTextInput
          label="Phone Number"
          placeholder="9876543210"
          type="numeric"
          value={phoneNumber}
          handleValueChange={setPhoneNumber}
        />
        <SingleSelectRadio
          label="Gender"
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Others",
              value: "others",
            },
          ]}
          value={gender}
          handleValueChange={setGender}
        />

        <CustomTextInput
          label="Height (in cm)"
          placeholder="180"
          type="numeric"
          value={height}
          handleValueChange={setHeight}
        />
        <CustomTextInput
          label="Weight (in kgs)"
          placeholder="80"
          type="numeric"
          value={weight}
          handleValueChange={setWeight}
        />
      </ScrollView>
      <Button onPress={handleNext}>Next</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    gap: 5,
  },
});

export default StepOne;
