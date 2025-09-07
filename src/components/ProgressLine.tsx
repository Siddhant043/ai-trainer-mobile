import { View, StyleSheet } from "react-native";
import { Rect, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { safeProgress } from "../utils/safeMath";

const LINE_LENGTH = 140; // total width of progress bar
const BAR_HEIGHT = 6;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const ProgressLine = ({ progress = 0 }: { progress: number }) => {
  const lineProgress = useSharedValue(0);

  useEffect(() => {
    const safe = safeProgress(progress);
    lineProgress.value = withTiming(safe, { duration: 2000 });
  }, [progress]);

  const animatedRectProps = useAnimatedProps(() => ({
    width: LINE_LENGTH * lineProgress.value, // animate the width
  }));

  const getProgressFillColor = (progress: number) => {
    const safe = safeProgress(progress);
    if (safe < 0.25) {
      return "#E95858";
    } else if (safe >= 0.25 && safe < 0.5) {
      return "#E9A358";
    } else if (safe >= 0.5 && safe < 0.75) {
      return "#F7B955";
    } else if (safe >= 0.75 && safe < 1) {
      return "#49B655";
    }
    return "#E95858"; // default color
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
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginLeft: 40,
  },
});

export default ProgressLine;
