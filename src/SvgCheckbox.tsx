import React, { useEffect, useState } from "react";
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

const defaultCheckmarkPath =
  "M13 31.1977C23.1081 36.4884 29.5946 45 29.5946 43C29.5946 45 37.5 25.5 64 1";
const defaultCheckmarkViewBox = "-10 -10 85 75";
const defaultCheckDuration = 400;
const defaultUnCheckDuration = 100;

const defaultStrokeParams: StrokeParams = {
  strokeWidth: 10,
  strokeLinejoin: "round",
  strokeLinecap: "round",
};

const outlineBoxPath =
  "M24 0.5H40C48.5809 0.5 54.4147 2.18067 58.117 5.88299C61.8193 9.58532 63.5 15.4191 63.5 24V40C63.5 48.5809 61.8193 54.4147 58.117 58.117C54.4147 61.8193 48.5809 63.5 40 63.5H24C15.4191 63.5 9.58532 61.8193 5.88299 58.117C2.18067 54.4147 0.5 48.5809 0.5 40V24C0.5 15.4191 2.18067 9.58532 5.88299 5.88299C9.58532 2.18067 15.4191 0.5 24 0.5Z";

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-             I N T E R F A C E S             -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export interface StrokeParams {
  strokeWidth: number;
  strokeLinejoin: Linejoin;
  strokeLinecap: Linecap;
}

interface Props {
  checked?: boolean;

  checkDuration?: number;
  unCheckDuration?: number;

  checkmarkColor: string;
  checkmarkPath?: string;
  checkmarkViewBox?: string;
  checkmarkStorkeParams?: StrokeParams;

  outlineColor: string;
  fillColor: string;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-              C O M P O N E N T              -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const SvgCheckbox = (props: Props) => {
  const progress = useSharedValue(0);

  const {
    checked,
    checkmarkColor,
    outlineColor,
    fillColor,
    checkDuration,
    unCheckDuration,
  } = props;
  const checkmarkPath = props.checkmarkPath ?? defaultCheckmarkPath;
  const checkmarkViewBox = props.checkmarkViewBox ?? defaultCheckmarkViewBox;
  const { strokeWidth, strokeLinejoin, strokeLinecap } =
    props.checkmarkStorkeParams ?? defaultStrokeParams;

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked
        ? checkDuration ?? defaultCheckDuration
        : unCheckDuration ?? defaultUnCheckDuration,
    });
  }, [checked]);

  // {progress.value} Multiplied by {3} for faster filling
  // In that case, checkmark animation cases more attention
  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        progress.value * (checked ? 3 : 1),
        [0, 1],
        [outlineColor, fillColor],
        "RGB"
      ),
      fill: interpolateColor(
        progress.value * (checked ? 3 : 1),
        [0, 1],
        ["#00000000", fillColor],
        "RGB"
      ),
    }),
    [fillColor, outlineColor]
  );

  return (
    <Svg viewBox={checkmarkViewBox}>
      <AnimatedPath
        d={outlineBoxPath}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <AnimatedInlineSvg
        progress={progress}
        d={checkmarkPath}
        stroke={checkmarkColor}
        strokeWidth={strokeWidth}
        strokeLinejoin={strokeLinejoin}
        strokeLinecap={strokeLinecap}
        strokeOpacity={checked || false ? 1 : 0}
      />
    </Svg>
  );
};

export default SvgCheckbox;
