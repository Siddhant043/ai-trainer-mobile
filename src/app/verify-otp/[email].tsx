import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/src/components/CustomTextInput";
import Button from "@/src/components/Button";
import CustomText from "@/src/components/CustomText";
import {
  useLocalSearchParams,
  useRouter,
  RelativePathString,
} from "expo-router";
import { useVerifyOtp } from "@/src/hooks";

const VerifyOTP = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const { verifyOtp, isPending, error } = useVerifyOtp();

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError(true);
      setOtpErrorMessage("Please enter a valid OTP");
      return;
    }
    setOtpError(false);
    setOtpErrorMessage("");
    await verifyOtp({ email, otp });
    if (isPending) {
      setOtpLoading(true);
      return;
    }
    if (error) {
      setOtpError(true);
      setOtpErrorMessage("Something went wrong");
      return;
    }
    setOtpLoading(false);
    setOtpError(false);
    setOtpErrorMessage("");
    setOtp("");
    router.push("/onboarding" as RelativePathString);
  };
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
          handleValueChange={(value) => {
            if (value.length > 6) return;
            setOtp(value);
          }}
        />
        {otpError && (
          <CustomText style={styles.error}>{otpErrorMessage}</CustomText>
        )}
        <Button
          onPress={handleVerifyOtp}
          disabled={otp.length !== 6 || otpLoading}
        >
          Submit
        </Button>
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
    padding: 20,
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
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default VerifyOTP;
