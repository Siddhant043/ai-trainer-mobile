import { Image, View } from "react-native";

type ChartsTabIconProps = {
  focused: boolean;
};

const ChartsTabIcon = (props: ChartsTabIconProps) => {
  const { focused } = props;
  const imageSource = focused
    ? require("@/assets/icons/png/chart_active.png")
    : require("@/assets/icons/png/chart_inactive.png");
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

export default ChartsTabIcon;
