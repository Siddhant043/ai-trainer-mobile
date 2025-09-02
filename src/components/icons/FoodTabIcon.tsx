import { Image, View } from "react-native";

type FoodTabIconProps = {
  focused: boolean;
};

const FoodTabIcon = (props: FoodTabIconProps) => {
  const { focused } = props;
  const imageSource = focused
    ? require("@/assets/icons/png/food_active.png")
    : require("@/assets/icons/png/food_inactive.png");
  return (
    <View
      style={{
        backgroundColor: props.focused ? "#000" : "",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        height: 50,
        width: 50,
      }}
    >
      <Image
        source={imageSource}
        style={{
          width: 25,
          height: 25,
        }}
      />
    </View>
  );
};

export default FoodTabIcon;
