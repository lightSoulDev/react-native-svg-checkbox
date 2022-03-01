import React, { useEffect, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Linecap, Linejoin } from "react-native-svg";
import AnimatedInlineSvg from "./AnimatedInlineSvg";

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-             I N T E R F A C E S             -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

export interface StrokeParams {
  strokeWidth: number;
  strokeLinejoin: Linejoin;
  strokeLinecap: Linecap;
}

interface Props {
  color: string;
  checked?: boolean;

  checkDuration?: number;
  unCheckDuration?: number;

  checkmarkPath?: string;
  checkmarkViewBox?: string;
  checkmarkStorkeParams?: StrokeParams;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-               D E F A U L T S               -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const defaultCheckmarkPath: string =
  "M13 31.1977C23.1081 36.4884 29.5946 45 29.5946 43C29.5946 45 37.5 25.5 64 1";
const defaultCheckmarkViewBox: string = "-10 -10 90 75";

const defaultStrokeParams: StrokeParams = {
  strokeWidth: 10,
  strokeLinejoin: "round",
  strokeLinecap: "round",
};

const defaultCheckDuration: number = 2000;
const defaultUnCheckDuration: number = 2000;

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-              C O M P O N E N T              -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const SvgCheckbox = (props: Props) => {
  const progress = useSharedValue(0);

  const { checked, color, checkDuration, unCheckDuration } = props;
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

  return (
    <Svg viewBox={checkmarkViewBox}>
      <AnimatedInlineSvg
        progress={progress}
        d={checkmarkPath}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin={strokeLinejoin}
        strokeLinecap={strokeLinecap}
      />
    </Svg>
  );
};

export default SvgCheckbox;
