import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Verify your Account</Text>
        <Text style={styles.description}>
          We have sent you a code to verify your account
        </Text>
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
          <Text style={styles.text}>Didn't receive the code?</Text>
          <Text style={styles.text}>Resend code</Text>
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
    fontWeight: "regular",
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
    fontWeight: "regular",
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
    fontWeight: "regular",
    color: "#707070",
  },
});

export default VerifyOTP;
