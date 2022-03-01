import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Linecap, Linejoin, Path } from "react-native-svg";
import AnimatedInlineSvg from "./AnimatedInlineSvg";

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-                 C O N S T S                 -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const AnimatedPath = Animated.createAnimatedComponent(Path);

const defaultCheckDuration = 400;
const defaultUnCheckDuration = 100;

const defaultCheckmarkStrokeParams: StrokeParams = {
  width: 10,
  linejoin: "round",
  linecap: "round",
};

const defaultOutlineStrokeParams: StrokeParams = {
  width: 7,
  linejoin: "round",
  linecap: "round",
};

const defaultCheckmarkSvgParams: SvgParams = {
  path: "M13 31.1977C23.1081 36.4884 29.5946 45 29.5946 43C29.5946 45 37.5 25.5 64 1",
  viewBox: {
    margin: {
      x: 10,
      y: 10,
    },
    x: 0,
    y: 0,
    width: 65,
    height: 55,
  },
};

const outlineSvgParams: SvgParams = {
  path: "M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z",
  viewBox: {
    margin: {
      x: 10,
      y: 10,
    },
    x: 0,
    y: 0,
    width: 65,
    height: 55,
  },
};

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-             I N T E R F A C E S             -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export interface ViewBoxParams {
  margin?: {
    x: number;
    y: number;
  };
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StrokeParams {
  width: number;
  linejoin: Linejoin;
  linecap: Linecap;
}

export interface SvgParams {
  path: string;
  viewBox: ViewBoxParams;
}

interface Props {
  checked?: boolean;

  checkDuration?: number;
  unCheckDuration?: number;

  checkmarkColor: string;
  checkmarkSvgParams?: SvgParams;
  checkmarkStrokeParams?: StrokeParams;

  outlineColor: string;
  outlineStrokeParams?: StrokeParams;

  fillColor: string;
  fillSpeedMultiplier?: number;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-              C O M P O N E N T              -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// TODO: Add easings

const SvgCheckbox = (props: Props) => {
  const progress = useSharedValue(0);
  const fillProgress = useSharedValue(0);

  const {
    checked,
    checkmarkColor,
    outlineColor,
    fillColor,
    checkDuration,
    unCheckDuration,
    fillSpeedMultiplier,
  } = props;

  const checkmarkSvgParams =
    props.checkmarkSvgParams ?? defaultCheckmarkSvgParams;
  const checkmarkStroke =
    props.checkmarkStrokeParams ?? defaultCheckmarkStrokeParams;
  const outlineStroke = props.outlineStrokeParams ?? defaultOutlineStrokeParams;

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked
        ? checkDuration ?? defaultCheckDuration
        : unCheckDuration ?? defaultUnCheckDuration,
    });
    fillProgress.value = withTiming(checked ? 1 : 0, {
      duration:
        (checked
          ? checkDuration ?? defaultCheckDuration
          : unCheckDuration ?? defaultUnCheckDuration) /
        (fillSpeedMultiplier ?? 1),
    });
  }, [checked]);

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        fillProgress.value,
        [0, 1],
        [outlineColor, fillColor],
        "RGB"
      ),
      fill: interpolateColor(
        fillProgress.value,
        [0, 1],
        ["#00000000", fillColor],
        "RGB"
      ),
    }),
    [fillColor, outlineColor]
  );

  const calculateViewBox = (params: ViewBoxParams): string => {
    const margin = params.margin ?? { x: 0, y: 0 };
    return [
      params.x - margin.x,
      params.y - margin.y,
      params.width + margin.x * 2,
      params.height + margin.y * 2,
    ].join(" ");
  };

  return (
    <View style={styles.container}>
      <Svg
        style={styles.outline}
        viewBox={calculateViewBox(outlineSvgParams.viewBox)}
      >
        <AnimatedPath
          d={outlineSvgParams.path}
          strokeWidth={outlineStroke.width}
          strokeLinejoin={outlineStroke.linejoin}
          strokeLinecap={outlineStroke.linecap}
          animatedProps={animatedBoxProps}
        />
      </Svg>
      <Svg viewBox={calculateViewBox(checkmarkSvgParams.viewBox)}>
        <AnimatedInlineSvg
          progress={progress}
          d={checkmarkSvgParams.path}
          stroke={checkmarkColor}
          strokeWidth={checkmarkStroke.width}
          strokeLinejoin={checkmarkStroke.linejoin}
          strokeLinecap={checkmarkStroke.linecap}
          strokeOpacity={checked || false ? 1 : 0}
        />
      </Svg>
    </View>
  );
};

export default SvgCheckbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  outline: {
    position: "absolute",
  },
});
