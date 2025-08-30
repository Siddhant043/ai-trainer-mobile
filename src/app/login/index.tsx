import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";
import GoogleSignInButton from "@/src/components/GoogleSignUpButton";
import AppleSignInButton from "@/src/components/AppleSignUpButton";
import CustomText from "@/src/components/CustomText";

const Login = () => {
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
        <CustomText style={styles.title}>Log in or Sign up</CustomText>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          label="Enter your email"
          type="email-address"
          placeholder="john@example.com"
          value={email}
          handleValueChange={setEmail}
        />
        <Button onPress={() => {}}>Submit</Button>
        <CustomText style={styles.text}>or</CustomText>
        <GoogleSignInButton />
        <AppleSignInButton />
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
  inputContainer: {
    width: "100%",
    gap: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default Login;
