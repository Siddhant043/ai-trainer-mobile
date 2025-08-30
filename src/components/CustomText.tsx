import { View, Text, TextStyle } from "react-native";

const CustomText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) => {
  return (
    <Text style={{ fontFamily: "OutfitRegular", ...style }}>{children}</Text>
  );
};

export default CustomText;
