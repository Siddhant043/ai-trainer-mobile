import { Image, View } from "react-native";

type HomeTabIconProps = {
  focused: boolean;
};

const HomeTabIcon = (props: HomeTabIconProps) => {
  const { focused } = props;
  const imageSource = focused
    ? require("@/assets/icons/png/home_active.png")
    : require("@/assets/icons/png/home_inactive.png");
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

export default HomeTabIcon;
