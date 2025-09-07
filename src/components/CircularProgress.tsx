import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Circle, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { safeProgress } from "../utils/safeMath";

const CIRCLE_LENGTH = 100;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

const CIRCLE_FILL_COLOR = "#D6D6D6";
const CIRCLE_STROKE_WIDTH = CIRCLE_LENGTH / 25;

const { width, height } = Dimensions.get("window") || {
  width: 375,
  height: 812,
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  progress: number;
  active?: boolean;
}

const CircularProgress = ({ progress, active }: CircularProgressProps) => {
  const circleProgress = useSharedValue(0);

  const activeColor = active ? "#FE5001" : "#000";

  useEffect(() => {
    const safe = safeProgress(progress);
    circleProgress.value = withTiming(safe, { duration: 2000 });
  }, [progress]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - circleProgress.value),
  }));

  const circleCenter = {
    x: ((width || 375) / CIRCLE_LENGTH) * 10,
    y: ((height || 812) / CIRCLE_LENGTH) * 3,
  };

  return (
    <View style={styles.container}>
      <Svg>
        <Circle
          cx={circleCenter.x}
          cy={circleCenter.y}
          r={CIRCLE_RADIUS}
          stroke={CIRCLE_FILL_COLOR}
          fill="transparent"
          strokeWidth={CIRCLE_STROKE_WIDTH}
        />
        <AnimatedCircle
          cx={circleCenter.x}
          cy={circleCenter.y}
          r={CIRCLE_RADIUS}
          stroke={activeColor}
          fill="transparent"
          strokeWidth={CIRCLE_STROKE_WIDTH}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedCircleProps}
          strokeLinecap={"round"}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircularProgress;
