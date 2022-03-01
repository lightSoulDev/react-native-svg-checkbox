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

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-              C O M P O N E N T              -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const SvgCheckbox = (props: Props) => {
  const { checked, color } = props;
  const progress = useSharedValue(0);

  const [strokeParams] = useState(
    props.checkmarkStorkeParams ?? defaultStrokeParams
  );
  const [checkmarkPath] = useState(props.checkmarkPath ?? defaultCheckmarkPath);
  const [checkmarkViewBox] = useState(
    props.checkmarkViewBox ?? defaultCheckmarkViewBox
  );

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 2000 : 2000,
    });
  }, [checked]);

  return (
    <Svg viewBox={checkmarkViewBox}>
      <AnimatedInlineSvg
        progress={progress}
        d={checkmarkPath}
        stroke={color}
        strokeWidth={strokeParams.strokeWidth}
        strokeLinejoin={strokeParams.strokeLinejoin}
        strokeLinecap={strokeParams.strokeLinecap}
      />
    </Svg>
  );
};

export default SvgCheckbox;
