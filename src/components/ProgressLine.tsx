import { View, StyleSheet } from "react-native";
import { Rect, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const LINE_LENGTH = 140; // total width of progress bar
const BAR_HEIGHT = 6;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const ProgressLine = ({ progress = 0 }: { progress: number }) => {
  const lineProgress = useSharedValue(0);

  useEffect(() => {
    lineProgress.value = withTiming(progress, { duration: 2000 });
  }, [progress]);

  const animatedRectProps = useAnimatedProps(() => ({
    width: LINE_LENGTH * lineProgress.value, // animate the width
  }));

  const getProgressFillColor = (progress: number) => {
    if (progress < 0.25) {
      return "#E95858";
    } else if (progress >= 0.25 && progress < 0.5) {
      return "#E9A358";
    } else if (progress >= 0.5 && progress < 0.75) {
      return "#F7B955";
    } else if (progress >= 0.75 && progress < 1) {
      return "#49B655";
    }
  };

  return (
    <View style={styles.container}>
      <Svg width={LINE_LENGTH} height={BAR_HEIGHT}>
        {/* Background bar with rounded edges */}
        <Rect
          x="0"
          y="0"
          width={LINE_LENGTH}
          height={BAR_HEIGHT}
          rx={BAR_HEIGHT / 2} // rounded corners
          fill="#E0E0E0"
        />

        {/* Animated foreground bar with rounded edges */}
        <AnimatedRect
          x="0"
          y="0"
          height={BAR_HEIGHT}
          rx={BAR_HEIGHT / 2}
          fill={getProgressFillColor(progress)}
          animatedProps={animatedRectProps}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginLeft: 40,
  },
});

export default ProgressLine;
