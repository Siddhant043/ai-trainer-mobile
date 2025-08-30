import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";
import CustomText from "@/src/components/CustomText";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
        <CustomText style={styles.title}>Verify your Account</CustomText>
        <CustomText style={styles.description}>
          We have sent you a code to verify your account
        </CustomText>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          label="Enter the OTP"
          type="numeric"
          placeholder="123456"
          value={otp}
          handleValueChange={setOtp}
        />
        <Button onPress={() => {}}>Submit</Button>
        <View style={styles.textContainer}>
          <CustomText style={styles.text}>Didn't receive the code?</CustomText>
          <CustomText style={styles.text}>Resend code</CustomText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "30%",
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: "#707070",
  },
  inputContainer: {
    width: "100%",
    gap: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: "#707070",
  },
});

export default VerifyOTP;
