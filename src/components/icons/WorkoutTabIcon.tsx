import { Image, View } from "react-native";

type WorkoutTabIconProps = {
  focused: boolean;
};

const WorkoutTabIcon = (props: WorkoutTabIconProps) => {
  const { focused } = props;
  const imageSource = focused
    ? require("@/assets/icons/png/workout_active.png")
    : require("@/assets/icons/png/workout_inactive.png");
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

export default WorkoutTabIcon;
