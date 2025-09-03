import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions } from "react-native";
import { Circle, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const CIRCLE_LENGTH = 150; // circumference
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const CIRCLE_FILL_COLOR = "#FFE4DB";
const CIRCLE_STROKE_WIDTH = CIRCLE_LENGTH / 35;

const { width, height } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CalorieBurnIconProps {
  progress?: number;
}

const CalorieBurnIcon = ({ progress = 0 }: CalorieBurnIconProps) => {
  const circleProgress = useSharedValue(0);

  useEffect(() => {
    circleProgress.value = withTiming(progress, { duration: 2000 });
  }, [progress]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - circleProgress.value),
  }));

  const circleCenter = {
    x: (width / CIRCLE_LENGTH) * 11,
    y: (height / CIRCLE_LENGTH) * 5,
  };

  const iconSize = 24;

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        {/* Filled background circle */}
        <Circle
          cx={circleCenter.x}
          cy={circleCenter.y}
          r={CIRCLE_RADIUS}
          fill={CIRCLE_FILL_COLOR}
        />

        {/* Fire icon centered inside */}
        <FontAwesome5
          name="fire"
          size={iconSize}
          color="#FE5001"
          style={{
            position: "absolute",
            left: circleCenter.x - iconSize / 3,
            top: circleCenter.y - iconSize / 2,
          }}
        />

        {/* Animated border circle */}
        <AnimatedCircle
          cx={circleCenter.x}
          cy={circleCenter.y}
          r={CIRCLE_RADIUS}
          stroke="#FE5001"
          fill="transparent"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    flex: 1,
  },
});

export default CalorieBurnIcon;
