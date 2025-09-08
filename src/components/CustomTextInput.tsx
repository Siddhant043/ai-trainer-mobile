import {
  View,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  Platform,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect, memo } from "react";
import CustomText from "./CustomText";

const CustomTextInput = ({
  label,
  type,
  placeholder,
  value,
  handleValueChange,
}: {
  label: string;
  type?: KeyboardTypeOptions;
  placeholder: string;
  value: string;
  handleValueChange: (text: string) => void;
}) => {
  const textInputRef = useRef<TextInput>(null);
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Sync internal value with external value when not focused
  useEffect(() => {
    if (!isFocused) {
      setInternalValue(value);
    }
  }, [value, isFocused]);

  // Memoize the change handler to prevent unnecessary re-renders
  const handleTextChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      // Use requestAnimationFrame to debounce external updates
      requestAnimationFrame(() => {
        handleValueChange(text);
      });
    },
    [handleValueChange]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Ensure external value is synced on blur
    handleValueChange(internalValue);
  }, [internalValue, handleValueChange]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.label}>{label}</CustomText>
      <TextInput
        ref={textInputRef}
        style={styles.input}
        value={isFocused ? internalValue : value}
        placeholderTextColor="#707070"
        keyboardType={type ?? "default"}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        // iOS-specific props to fix RemoteTextInput issues
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
        // Prevent keyboard session issues
        blurOnSubmit={false}
        returnKeyType="done"
        enablesReturnKeyAutomatically={true}
        // Additional iOS stability props
        clearButtonMode="while-editing"
        keyboardAppearance="default"
        // Prevent text selection issues that can cause session problems
        selectTextOnFocus={false}
        // Disable smart features that can interfere with keyboard sessions
        smartInsertDelete={false}
        // Platform-specific optimizations
        {...(Platform.OS === "ios" && {
          textContentType: "none",
          passwordRules: undefined,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#707070",
  },
  input: {
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#EDEDED",
    marginTop: 5,
    color: "#000",
    fontSize: 20,
    width: "100%",
    fontFamily: "OutfitRegular",
  },
});

// Memoize the component to prevent unnecessary re-renders
export default memo(CustomTextInput);
